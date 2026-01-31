from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    class Roles(models.TextChoices):
        PUBLIC = "public", _("Public User")
        REGISTERED = "registered", _("Registered User")
        EXECUTOR = "executor", _("Executor")
        MODERATOR = "moderator", _("Moderator")
        REGIONAL_ADMIN = "regional_admin", _("Regional Admin")
        AGENCY_ADMIN = "agency_admin", _("Agency Admin")
        INSPECTOR = "inspector", _("Inspector")
        SCIENCE_MODERATOR = "science_moderator", _("Science Moderator")

    role = models.CharField(max_length=20, choices=Roles.choices, default=Roles.PUBLIC)
    phone_number = models.CharField(max_length=20, blank=True)


class ForestCompartment(models.Model):
    """
    O'rmon fondi yerlari (Poligonlar)
    """

    class Status(models.TextChoices):
        AVAILABLE = "available", _("Available for Lease")
        PENDING = "pending", _("Pending Approval")
        LEASED = "leased", _("Leased")
        PROTECTED = "protected", _("Protected / Reserve")

    name = models.CharField(max_length=255)
    polygon = models.JSONField(help_text="GIS Polygons (JSON format)")
    area_ha = models.FloatField(help_text="Maydoni (gektar)")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.AVAILABLE)
    
    # Attributes for AI recommendations
    soil_type = models.CharField(max_length=100, blank=True)
    climate_zone = models.CharField(max_length=100, blank=True)
    ndvi_index = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"


class LeaseContract(models.Model):
    """
    Elektron ijara shartnomalari
    """
    compartment = models.OneToOneField(ForestCompartment, on_delete=models.CASCADE, related_name="contract")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="contracts")
    
    start_date = models.DateField()
    end_date = models.DateField()
    annual_price = models.DecimalField(max_digits=15, decimal_places=2)
    
    is_signed_eri = models.BooleanField(default=False, help_text="ERI bilan imzolangan")
    is_paid = models.BooleanField(default=False)
    
    contract_pdf = models.FileField(upload_to="contracts/", null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shartnoma #{self.id} - {self.user.username}"


class TreeStand(models.Model):
    """
    Daraxtlar haqida ma'lumot
    """

    compartment = models.ForeignKey(
        ForestCompartment, on_delete=models.CASCADE, related_name="stands"
    )
    species = models.CharField(max_length=100)
    age = models.IntegerField()
    volume_m3 = models.FloatField(help_text="Volume in cubic meters")
    density = models.FloatField(help_text="Stand density")

    def __str__(self):
        return f"{self.species} ({self.age} years) in {self.compartment.name}"


class Appeal(models.Model):
    """
    Tezkor murojaatlar (Yong'in, noqonuniy kesish)
    """

    class AppealType(models.TextChoices):
        FIRE = "fire", _("Fire")
        ILLEGAL_CUTTING = "illegal_cutting", _("Illegal Cutting")
        WASTE = "waste", _("Waste")
        ILLEGAL_CONSTRUCTION = "illegal_construction", _("Illegal Construction")
        OTHER = "other", _("Other")

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    type = models.CharField(max_length=20, choices=AppealType.choices)
    location = models.JSONField(help_text="GIS Point (JSON format)")  # Temporary replacement for PointField
    photo = models.ImageField(upload_to="appeals/", blank=True, null=True)
    description = models.TextField()
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_type_display()} at {self.created_at}"
class Task(models.Model):
    """
    Xaritadan belgilangan vazifalar
    """
    class Priority(models.TextChoices):
        LOW = "low", _("Low")
        MEDIUM = "medium", _("Medium")
        HIGH = "high", _("High")
        CRITICAL = "critical", _("Critical")

    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.JSONField(help_text="GIS Point (JSON format)")
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.MEDIUM)
    executor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="assigned_tasks")
    deadline = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.get_priority_display()}"
