const fs = require('fs');
const path = require('path');

const auditReport = {
    timestamp: new Date().toISOString(),
    projeto: "SGP - Módulo de Gestão de Parcerias",
    responsavel: "Marcelo Fernandes (Gabinete DTPAR/MGI)",
    statusGeral: "EM ANÁLISE",
    checkpoints: []
};

function logCheck(component, status, detail) {
    auditReport.checkpoints.push({ component, status, detail });
}

// 1. Verificação de Integridade de Arquivos Core
const coreFiles = [
    'src/components/CentralEvolucao.tsx',
    'src/components/SimuladorElegibilidade.tsx',
    'src/components/MapaRollout.tsx',
    'src/firebase.ts',
    'package.json'
];

coreFiles.forEach(file => {
    if (fs.existsSync(path.resolve(__dirname, file))) {
        logCheck(`Arquivo: ${file}`, '✅ OK', 'Arquivo presente no repositório.');
    } else {
        logCheck(`Arquivo: ${file}`, '❌ FALHA', 'Arquivo essencial não encontrado.');
    }
});

// 2. Auditoria de Lógica de Segurança (Gatekeeper Marcelo)
try {
    const centralCode = fs.readFileSync(path.resolve(__dirname, 'src/components/CentralEvolucao.tsx'), 'utf8');
    if (centralCode.includes('marcelofernandesgarcia@gmail.com')) {
        logCheck('Segurança: Gatekeeper', '✅ OK', 'Lógica de restrição de execução para o administrador identificada.');
    } else {
        logCheck('Segurança: Gatekeeper', '⚠️ ALERTA', 'Lógica de trava por e-mail não detectada no componente.');
    }
} catch (e) {
    logCheck('Segurança: Gatekeeper', '❌ ERRO', 'Não foi possível ler o arquivo de segurança.');
}

// 3. Verificação de Dependências Críticas
try {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));
    const deps = pkg.dependencies || {};
    const required = ['firebase', 'lucide-react', 'jspdf'];
    
    required.forEach(dep => {
        if (deps[dep]) {
            logCheck(`Dependência: ${dep}`, '✅ OK', `Versão ${deps[dep]} instalada.`);
        } else {
            logCheck(`Dependência: ${dep}`, '❌ FALHA', `Biblioteca ${dep} ausente.`);
        }
    });
} catch (e) {
    logCheck('Dependências', '❌ ERRO', 'Erro ao ler o package.json.');
}

// Resultado Final
console.log("====================================================");
console.log("RELATÓRIO DE AUDITORIA DO SISTEMA SGP");
console.log("====================================================");
console.table(auditReport.checkpoints);
console.log(`\nStatus Final: ${auditReport.checkpoints.every(c => c.status !== '❌ FALHA') ? 'APROVADO' : 'REPROVADO'}`);
