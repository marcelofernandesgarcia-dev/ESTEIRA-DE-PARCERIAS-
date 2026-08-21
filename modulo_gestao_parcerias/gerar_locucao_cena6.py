import asyncio
import os
import edge_tts

async def generate_cena_6_speech():
    output_dir = r"C:\Users\marce\.gemini\antigravity\scratch\modulo-gestao-parcerias\media"
    os.makedirs(output_dir, exist_ok=True)
    
    text = "Com integridade, parceria e inovação, construímos um amanhã brilhante para todos. Rede de Parcerias: o futuro já começou!"
    voice = "pt-BR-FranciscaNeural"
    
    filepath = os.path.join(output_dir, "locucao_cena_6.mp3")
    print(f"Gerando áudio para Cena 6 -> locucao_cena_6.mp3...")
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(filepath)
    print(f"Salvo em: {filepath}")
    
    # Copia para a pasta Vídeos
    dest_dir = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    if os.path.exists(dest_dir):
        import shutil
        shutil.copy(filepath, dest_dir)
        print("Cópia de áudio da Cena 6 concluída.")

if __name__ == "__main__":
    asyncio.run(generate_cena_6_speech())
