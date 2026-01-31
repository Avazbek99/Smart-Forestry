import subprocess
import os
import sys
import time

def run_commands():
    # Paths
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, 'backend')
    frontend_dir = os.path.join(root_dir, 'frontend')

    print("🚀 SMART FORESTRY platformasi ishga tushirilmoqda...")

    try:
        # Start Backend
        print("📦 Backend (Django) ishga tushmoqda...")
        backend_process = subprocess.Popen(
            [sys.executable, "manage.py", "runserver"],
            cwd=backend_dir
        )

        # Start Frontend
        print("💻 Frontend (Next.js) ishga tushmoqda...")
        # Check if node_modules exists, if not, attempt to install
        if not os.path.exists(os.path.join(frontend_dir, 'node_modules')):
            print("⚠️ node_modules topilmadi. Kutubxonalar o'rnatilmoqda (npm install)...")
            subprocess.run(["npm", "install"], cwd=frontend_dir, shell=True)

        frontend_process = subprocess.Popen(
            ["npm", "run", "dev", "--", "-p", "3030"],
            cwd=frontend_dir,
            shell=True
        )

        print("\n✅ Platforma tayyor!")
        print("🔗 API: http://127.0.0.1:8000/api/")
        print("🔗 Admin: http://127.0.0.1:8000/admin/")
        print("🔗 Frontend: http://127.0.0.1:3030\n")

        # Keep the script running
        while True:
            time.sleep(1)
            if backend_process.poll() is not None:
                print("❌ Backend to'xtadi.")
                break
            if frontend_process.poll() is not None:
                print("❌ Frontend to'xtadi.")
                break

    except KeyboardInterrupt:
        print("\n🛑 To'xtatildi. Jarayonlar yopilmoqda...")
        backend_process.terminate()
        frontend_process.terminate()
    except Exception as e:
        print(f"❌ Xatolik yuz berdi: {e}")

if __name__ == "__main__":
    run_commands()
