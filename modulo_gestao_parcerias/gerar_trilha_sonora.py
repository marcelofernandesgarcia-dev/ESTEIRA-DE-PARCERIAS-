import os
import wave
import struct
import math

def generate_clean_bg_music(filename, duration=90, sample_rate=44100):
    print("Gerando trilha sonora sintética limpa (sem vocais)...")
    
    # Frequências dos acordes (pad suave)
    # Progressão: Cmaj7, Am7, Fmaj7, G7
    chords = [
        [130.81, 196.00, 261.63, 329.63, 392.00], # Cmaj7
        [110.00, 165.00, 220.00, 261.63, 329.63], # Am7
        [87.31, 130.81, 174.61, 220.00, 261.63],  # Fmaj7
        [98.00, 146.83, 196.00, 246.94, 293.66]   # G7
    ]
    
    chord_duration = duration / len(chords)
    num_samples_per_chord = int(sample_rate * chord_duration)
    
    # Abre o gravador de WAV
    wav_file = wave.open(filename, 'w')
    wav_file.setparams((1, 2, sample_rate, 0, 'NONE', 'not compressed')) # Mono, 16-bit
    
    for idx, chord in enumerate(chords):
        print(f"Sintetizando acorde {idx+1}/{len(chords)}...")
        
        # Envelope de fade in/out lento para o acorde
        attack_samples = int(sample_rate * 2.0) # 2 segundos de fade-in
        decay_samples = int(sample_rate * 2.0)  # 2 segundos de fade-out
        stable_samples = num_samples_per_chord - attack_samples - decay_samples
        
        for s in range(num_samples_per_chord):
            # Calcula o envelope de amplitude
            if s < attack_samples:
                amplitude = s / attack_samples
            elif s < attack_samples + stable_samples:
                amplitude = 1.0
            else:
                amplitude = 1.0 - (s - attack_samples - stable_samples) / decay_samples
                
            # Garante amplitude suave
            amplitude = max(0.0, min(1.0, amplitude))
            
            # Combina frequências do acorde
            val = 0.0
            t = s / sample_rate
            for freq in chord:
                # Onda senoidal fundamental
                val += math.sin(2 * math.pi * freq * t)
                # Harmônico suave (oitava acima)
                val += 0.25 * math.sin(2 * math.pi * (freq * 2) * t)
                
            # Normaliza a mistura das notas
            val = (val / len(chord)) * amplitude * 0.15 # 15% volume
            
            # Limita para 16-bit
            val_int = int(max(-32768, min(32767, val * 32767)))
            data = struct.pack('<h', val_int)
            wav_file.writeframesraw(data)
            
    wav_file.close()
    print(f"Trilha sonora salva com sucesso em: {filename}")

if __name__ == "__main__":
    output_path = r"C:\Users\marce\.gemini\antigravity\scratch\modulo-gestao-parcerias\media\ambient_music_bed.wav"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    generate_clean_bg_music(output_path, duration=150)
