import os
import django
import random
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import ForestCompartment, TreeStand, Appeal, User, Task, LeaseContract
from django.utils import timezone
from datetime import timedelta

def generate_data():
    print("🧹 Cleaning old data...")
    User.objects.filter(is_superuser=False).delete()
    ForestCompartment.objects.all().delete()
    Appeal.objects.all().delete()
    Task.objects.all().delete()

    print("👥 Generating Users (8 Roles)...")
    roles = User.Roles.values
    demo_users = {}
    for role in roles:
        user = User.objects.create_user(
            username=f"demo_{role}",
            email=f"{role}@smartforest.uz",
            password="password123",
            role=role,
            phone_number="+998901234567"
        )
        demo_users[role] = user

    print("🌳 Generating Forest Compartments & Statuses...")
    locations = [
        {"name": "Zomin Davlat Qo'riqxonasi", "coords": [39.638, 68.468], "status": "protected"},
        {"name": "Ugam-Chotqol Milliy Bog'i", "coords": [41.562, 70.015], "status": "available"},
        {"name": "Kitob Geologiya Qo'riqxonasi", "coords": [39.186, 67.291], "status": "leased"},
        {"name": "Orol Bo'yi O'rmonlari", "coords": [43.000, 59.000], "status": "available"},
        {"name": "Farg'ona Vodiy O'rmon xo'jaligi", "coords": [40.384, 71.784], "status": "pending"},
    ]
    
    species_list = ["Archa", "Qarag'ay", "Yong'oq", "Chinormon", "Terak"]
    
    for loc in locations:
        comp = ForestCompartment.objects.create(
            name=loc['name'],
            polygon=json.dumps({
                "type": "Polygon",
                "coordinates": [[
                    [loc['coords'][1]-0.015, loc['coords'][0]-0.015],
                    [loc['coords'][1]+0.015, loc['coords'][0]-0.015],
                    [loc['coords'][1]+0.015, loc['coords'][0]+0.015],
                    [loc['coords'][1]-0.015, loc['coords'][0]+0.015],
                    [loc['coords'][1]-0.015, loc['coords'][0]-0.015]
                ]]
            }),
            area_ha=random.uniform(500, 5000),
            status=loc['status'],
            soil_type=random.choice(["Qora tuproq", "Bo'z tuproq", "Sho'rxok"]),
            climate_zone="Kontinental",
            ndvi_index=random.uniform(0.3, 0.8)
        )
        
        # If leased, create a contract
        if loc['status'] == 'leased':
            LeaseContract.objects.create(
                compartment=comp,
                user=demo_users['registered'],
                start_date=timezone.now().date(),
                end_date=(timezone.now() + timedelta(days=3650)).date(),
                annual_price=12000000.00,
                is_signed_eri=True,
                is_paid=True
            )

        # Add stands
        for _ in range(2):
            TreeStand.objects.create(
                compartment=comp,
                species=random.choice(species_list),
                age=random.randint(10, 80),
                volume_m3=random.uniform(100, 1000),
                density=random.uniform(0.4, 0.9)
            )

    print("📋 Generating Regional Tasks...")
    for i in range(5):
        Task.objects.create(
            title=f"Vazifa #{i+1}: Nazorat tadbiri",
            description="Hududda sanitariya holatini tekshirish va yong'in xavfsizligini ta'minlash.",
            location=json.dumps({"type": "Point", "coordinates": [69.24 + random.uniform(-0.1, 0.1), 41.31 + random.uniform(-0.1, 0.1)]}),
            priority=random.choice(['low', 'medium', 'high', 'critical']),
            executor=demo_users['inspector'],
            deadline=timezone.now() + timedelta(days=random.randint(1, 10))
        )

    print("🚨 Generating Real Appeals...")
    for i in range(8):
        Appeal.objects.create(
            user=demo_users['public'],
            type=random.choice(['fire', 'illegal_cutting', 'waste']),
            location=json.dumps({"type": "Point", "coordinates": [69.24 + random.uniform(-0.1, 0.1), 41.31 + random.uniform(-0.1, 0.1)]}),
            description=f"Fuqaro murojaati Hash-{random.randint(1000, 9999)}. Holatni o'rganish lozim.",
            is_resolved=random.choice([True, False])
        )

    print("💎 Demo ma'lumotlar MUKAMMAL darajada tayyorlandi!")

if __name__ == "__main__":
    generate_data()

if __name__ == "__main__":
    generate_data()
