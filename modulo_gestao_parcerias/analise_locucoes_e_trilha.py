import os
import numpy as np
from moviepy import VideoFileClip, AudioFileClip

def analyze_audio_track(filepath, log_file):
    if not os.path.exists(filepath):
        log_file.write(f"Arquivo não encontrado: {filepath}\n")
        return
        
    try:
        clip = AudioFileClip(filepath)
        arr = clip.to_soundarray(fps=22050)
        duration = clip.duration
        
        # RMS médio
        rms = np.sqrt(np.mean(arr**2))
        peak = np.max(np.abs(arr))
        
        log_file.write(f"- {os.path.basename(filepath)}:\n")
        log_file.write(f"  Duração: {duration:.2f}s | Volume Médio (RMS): {rms:.4f} | Pico: {peak:.4f}\n")
        
        # Verifica se há som nos primeiros 1.0s (silêncio esperado devido ao delay)
        if duration > 1.0:
            sub_silence = clip.subclipped(0, 1.0)
            arr_silence = sub_silence.to_soundarray(fps=22050)
            rms_silence = np.sqrt(np.mean(arr_silence**2))
            log_file.write(f"  RMS no primeiro 1s (silêncio): {rms_silence:.4f}\n")
            if rms_silence > 0.005:
                log_file.write(f"  ⚠️ ALERTA: Há som detectado na parte que deveria ser silêncio!\n")
            else:
                log_file.write(f"  ✅ Silêncio de 1s confirmado no início.\n")
                
        clip.close()
    except Exception as e:
        log_file.write(f"Erro ao analisar {filepath}: {e}\n")

def main():
    media_dir = r"C:\Users\marce\.gemini\antigravity\scratch\modulo-gestao-parcerias\media"
    log_path = r"C:\Users\marce\.gemini\antigravity\scratch\analise_locucoes_e_trilha.log"
    
    with open(log_path, "w", encoding="utf-8") as log:
        log.write("=== Análise das Locuções e Trilha Sonora ===\n\n")
        
        log.write("1. Verificando Locuções MP3:\n")
        for idx in range(1, 7):
            filepath = os.path.join(media_dir, f"locucao_cena_{idx}.mp3")
            analyze_audio_track(filepath, log)
            
        log.write("\n2. Verificando Trilha Sonora Sintética:\n")
        bg_path = os.path.join(media_dir, "ambient_music_bed.wav")
        analyze_audio_track(bg_path, log)
        
    print(f"Análise concluída e salva em: {log_path}")

if __name__ == "__main__":
    main()
