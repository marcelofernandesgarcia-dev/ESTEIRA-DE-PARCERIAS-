import asyncio
import os
import edge_tts

SCENE_TEXTS = {
    1: "Em nosso município, cada voz importa. A Prefeita Estrela Maria sabe que governar de verdade começa ouvindo as reais necessidades de quem mais precisa. A escuta ativa e a união são as bases para transformar a nossa comunidade.",
    2: "Com os desafios identificados, é hora de agir. Com planejamento rigoroso e o uso do Obrasgov.br, cada creche, escola e posto de saúde sai do papel com transparência, acompanhamento físico e segurança garantida.",
    3: "Dizemos adeus à velha burocracia do papel e aos prazos perdidos. A tramitação eletrônica e o Transferegov.br trazem velocidade, controle e eficiência total aos recursos públicos na palma da mão.",
    4: "Porque licitar bem é apenas o primeiro passo. Com a plataforma Contratos.gov.br, fiscalizamos a execução de cada centavo em tempo real. É a garantia de que o dinheiro público é bem investido.",
    5: "Integrando tecnologia e cidadania, construímos um novo pacto federativo de integridade. Com a Rede de Parcerias do Governo Federal, fazemos mais e melhor. Rede de Parcerias: O futuro é colaborativo!",
    6: "Com integridade, parceria e inovação, construímos um amanhã brilhante para todos. Rede de Parcerias: o futuro já começou!"
}

async def generate_speech(idx, text, output_dir):
    voice = "pt-BR-FranciscaNeural"
    filepath = os.path.join(output_dir, f"locucao_cena_{idx}.mp3")
    print(f"Gerando áudio limpo para Cena {idx}...")
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(filepath)
    print(f"Cena {idx} salva em: {filepath}")

async def main():
    output_dir = r"C:\Users\marce\.gemini\antigravity\scratch\modulo-gestao-parcerias\media"
    os.makedirs(output_dir, exist_ok=True)
    
    tasks = []
    for idx, text in SCENE_TEXTS.items():
        tasks.append(generate_speech(idx, text, output_dir))
        
    await asyncio.gather(*tasks)
    print("Todas as 6 locuções foram regeneradas com sucesso e estão 100% limpas!")

if __name__ == "__main__":
    asyncio.run(main())
