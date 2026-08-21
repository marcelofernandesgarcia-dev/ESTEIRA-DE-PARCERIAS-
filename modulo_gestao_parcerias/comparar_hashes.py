import os
import hashlib

def get_file_hash(filepath):
    hasher = hashlib.md5()
    with open(filepath, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def main():
    folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    files = {
        "PARCIAL": "RESULTADO PARCIAL.mp4",
        "FINAL": "RESULTADO.mp4"
    }
    
    # Busca dinâmica dos nomes reais dos arquivos
    os_files = os.listdir(folder)
    for key, val in files.items():
        prefix = val.split(".")[0]
        for f in os_files:
            if f.lower().startswith(prefix[:8].lower()) and f.lower().endswith(".mp4"):
                files[key] = os.path.join(folder, f)
                break
                
    h_parcial = get_file_hash(files["PARCIAL"])
    h_final = get_file_hash(files["FINAL"])
    
    print(f"MD5 de RESULTADO PARCIAL: {h_parcial}")
    print(f"MD5 de RESULTADO FINAL:   {h_final}")
    
    if h_parcial == h_final:
        print("Os arquivos são binariamente IDÊNTICOS!")
    else:
        print("Os arquivos são binariamente diferentes (embora visualmente muito parecidos).")

if __name__ == "__main__":
    main()
