import asyncio
import os
import edge_tts

# Textos da locução (corrigidos com acentos adequados)
SCENES = [
    {
        "id": 1,
        "text": "Em nosso município, cada voz importa. A Prefeita Estrela Maria sabe que governar de verdade começa ouvindo as reais necessidades de quem mais precisa. A escuta ativa e a união são as bases para transformar a nossa comunidade."
    },
    {
        "id": 2,
        "text": "Com os desafios identificados, é hora de agir. Com planejamento rigoroso e o uso do Obrasgov.br, cada creche, escola e posto de saúde sai do papel com transparência, acompanhamento físico e segurança garantida."
    },
    {
        "id": 3,
        "text": "Dizemos adeus à velha burocracia do papel e aos prazos perdidos. A tramitação eletrônica e o Transferegov.br trazem velocidade, controle e eficiência total aos recursos públicos na palma da mão."
    },
    {
        "id": 4,
        "text": "Porque licitar bem é apenas o primeiro passo. Com a plataforma Contratos.gov.br, fiscalizamos a execução de cada centavo em tempo real. É a garantia de que o dinheiro público é bem investido."
    },
    {
        "id": 5,
        "text": "Integrando tecnologia e cidadania, construímos um novo pacto federativo de integridade. Com a Rede de Parcerias do Governo Federal, fazemos mais e melhor. Rede de Parcerias: O futuro é colaborativo!"
    }
]

VOICE = "pt-BR-FranciscaNeural" # Voz feminina neural em Português do Brasil

async def generate_speech():
    output_dir = r"C:\Users\marce\.gemini\antigravity\scratch\modulo-gestao-parcerias\media"
    os.makedirs(output_dir, exist_ok=True)
    
    print("Iniciando geração de áudio por inteligência artificial...")
    
    for scene in SCENES:
        filename = f"locucao_cena_{scene['id']}.mp3"
        filepath = os.path.join(output_dir, filename)
        
        print(f"Gerando áudio para Cena {scene['id']} -> {filename}...")
        communicate = edge_tts.Communicate(scene["text"], VOICE)
        await communicate.save(filepath)
        print(f"Salvo em: {filepath}")

    # Também vamos gerar o áudio completo unificado de 1 minuto
    full_text = " ".join([scene["text"] for scene in SCENES])
    full_filepath = os.path.join(output_dir, "locucao_completa_1min.mp3")
    print("Gerando áudio completo unificado (1 minuto)...")
    communicate_full = edge_tts.Communicate(full_text, VOICE)
    await communicate_full.save(full_filepath)
    print(f"Salvo em: {full_filepath}")
    
    # Copia os arquivos gerados para a pasta Vídeos do usuário para acesso fácil
    dest_dir = r"C:\Users\marce\Videos"
    if os.path.exists(dest_dir):
        print(f"Copiando arquivos de áudio para {dest_dir}...")
        import shutil
        for scene in SCENES:
            shutil.copy(os.path.join(output_dir, f"locucao_cena_{scene['id']}.mp3"), dest_dir)
        shutil.copy(full_filepath, dest_dir)
        print("Cópia concluída com sucesso!")

if __name__ == "__main__":
    asyncio.run(generate_speech())
