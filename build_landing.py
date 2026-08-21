import os
import shutil

src = r"C:\Users\marce\Documents\antigravity\charming-einstein\landing_transferegov"
dst = r"C:\Users\marce\Documents\antigravity\charming-einstein\dist"

def build():
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    print("Build completed successfully. Static files copied to dist/")

if __name__ == '__main__':
    build()
