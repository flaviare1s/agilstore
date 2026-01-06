const fs = require("fs");
const readline = require("readline");

// Arquivo para persistência dos dados
const DATA_FILE = "produtos.json";

// Interface para leitura de input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Classe para gerenciar o inventário
class InventarioAgilStore {
  constructor() {
    this.produtos = [];
    this.proximoId = 1;
    this.carregarDados();
  }

  // Carregar dados do arquivo JSON
  carregarDados() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const dados = fs.readFileSync(DATA_FILE, "utf8");
        const json = JSON.parse(dados);
        this.produtos = json.produtos || [];
        this.proximoId = json.proximoId || 1;
        console.log("Dados carregados com sucesso!\n");
      }
    } catch (erro) {
      console.log(
        "Erro ao carregar dados. Iniciando com inventário vazio.\n"
      );
    }
  }

  // Salvar dados no arquivo JSON
  salvarDados() {
    try {
      const dados = {
        produtos: this.produtos,
        proximoId: this.proximoId,
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(dados, null, 2), "utf8");
      console.log("Dados salvos com sucesso!\n");
    } catch (erro) {
      console.log("Erro ao salvar dados:", erro.message, "\n");
    }
  }

  // Adicionar novo produto
  adicionarProduto(nome, categoria, quantidade, preco) {
    const produto = {
      id: this.proximoId++,
      nome,
      categoria,
      quantidade: parseInt(quantidade),
      preco: parseFloat(preco),
    };
    this.produtos.push(produto);
    this.salvarDados();
    console.log(
      `\n Produto "${nome}" adicionado com sucesso! (ID: ${produto.id})\n`
    );
  }

  // Listar todos os produtos
  listarProdutos(filtroCategoria = null, ordenarPor = null) {
    if (this.produtos.length === 0) {
      console.log("\n Nenhum produto cadastrado no inventário.\n");
      return;
    }

    let produtosFiltrados = [...this.produtos];

    // Aplicar filtro de categoria
    if (filtroCategoria) {
      produtosFiltrados = produtosFiltrados.filter((p) =>
        p.categoria.toLowerCase().includes(filtroCategoria.toLowerCase())
      );
      if (produtosFiltrados.length === 0) {
        console.log(
          `\n  Nenhum produto encontrado na categoria "${filtroCategoria}".\n`
        );
        return;
      }
    }

    // Aplicar ordenação
    if (ordenarPor) {
      switch (ordenarPor) {
        case "nome":
          produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
          break;
        case "quantidade":
          produtosFiltrados.sort((a, b) => a.quantidade - b.quantidade);
          break;
        case "preco":
          produtosFiltrados.sort((a, b) => a.preco - b.preco);
          break;
      }
    }

    console.log(
      "\n┌────────────────────────────────────────────────────────────────────────────────┐"
    );
    console.log(
      "│                          INVENTÁRIO AGILSTORE                                  │"
    );
    console.log(
      "├─────┬──────────────────────┬──────────────────┬────────────┬───────────────────┤"
    );
    console.log(
      "│ ID  │ Nome do Produto      │ Categoria        │ Quantidade │ Preço (R$)        │"
    );
    console.log(
      "├─────┼──────────────────────┼──────────────────┼────────────┼───────────────────┤"
    );

    produtosFiltrados.forEach((p) => {
      console.log(
        `│ ${String(p.id).padEnd(3)} │ ${p.nome
          .padEnd(20)
          .substring(0, 20)} │ ${p.categoria
          .padEnd(16)
          .substring(0, 16)} │ ${String(p.quantidade).padStart(10)} │ ${p.preco
          .toFixed(2)
          .padStart(17)} │`
      );
    });

    console.log(
      "└─────┴──────────────────────┴──────────────────┴────────────┴───────────────────┘"
    );
    console.log(`\ Total de produtos: ${produtosFiltrados.length}\n`);
  }

  // Buscar produto por ID
  buscarPorId(id) {
    return this.produtos.find((p) => p.id === parseInt(id));
  }

  // Buscar produtos por nome
  buscarPorNome(termo) {
    return this.produtos.filter((p) =>
      p.nome.toLowerCase().includes(termo.toLowerCase())
    );
  }

  // Exibir detalhes de um produto
  exibirDetalhes(produto) {
    console.log("\n╔════════════════════════════════════════════╗");
    console.log("║        DETALHES DO PRODUTO                 ║");
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ ID:         ${produto.id.toString().padEnd(31)} ║`);
    console.log(`║ Nome:       ${produto.nome.padEnd(31)} ║`);
    console.log(`║ Categoria:  ${produto.categoria.padEnd(31)} ║`);
    console.log(`║ Quantidade: ${produto.quantidade.toString().padEnd(31)} ║`);
    console.log(`║ Preço:      R$ ${produto.preco.toFixed(2).padEnd(28)} ║`);
    console.log("╚════════════════════════════════════════════╝\n");
  }

  // Atualizar produto
  atualizarProduto(id, dadosAtualizados) {
    const produto = this.buscarPorId(id);
    if (!produto) {
      console.log(`\n Produto com ID ${id} não encontrado.\n`);
      return false;
    }

    if (dadosAtualizados.nome) produto.nome = dadosAtualizados.nome;
    if (dadosAtualizados.categoria)
      produto.categoria = dadosAtualizados.categoria;
    if (dadosAtualizados.quantidade !== undefined)
      produto.quantidade = parseInt(dadosAtualizados.quantidade);
    if (dadosAtualizados.preco !== undefined)
      produto.preco = parseFloat(dadosAtualizados.preco);

    this.salvarDados();
    console.log(`\n  Produto ID ${id} atualizado com sucesso!\n`);
    return true;
  }

  // Excluir produto
  excluirProduto(id) {
    const index = this.produtos.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      console.log(`\n  Produto com ID ${id} não encontrado.\n`);
      return false;
    }

    const produtoRemovido = this.produtos.splice(index, 1)[0];
    this.salvarDados();
    console.log(
      `\n  Produto "${produtoRemovido.nome}" (ID: ${id}) removido com sucesso!\n`
    );
    return true;
  }
}

// Função auxiliar para fazer perguntas
function pergunta(texto) {
  return new Promise((resolve) => rl.question(texto, resolve));
}

// Menu principal
async function menuPrincipal(inventario) {
  console.clear();
  console.log("╔════════════════════════════════════════════╗");
  console.log("║      AGILSTORE - GESTÃO DE INVENTÁRIO      ║");
  console.log("╠════════════════════════════════════════════╣");
  console.log("║  1. Adicionar Produto                      ║");
  console.log("║  2. Listar Produtos                        ║");
  console.log("║  3. Buscar Produto                         ║");
  console.log("║  4. Atualizar Produto                      ║");
  console.log("║  5. Excluir Produto                        ║");
  console.log("║  0. Sair                                   ║");
  console.log("╚════════════════════════════════════════════╝\n");

  const opcao = await pergunta("Escolha uma opção: ");

  switch (opcao.trim()) {
    case "1":
      await adicionarProdutoMenu(inventario);
      break;
    case "2":
      await listarProdutosMenu(inventario);
      break;
    case "3":
      await buscarProdutoMenu(inventario);
      break;
    case "4":
      await atualizarProdutoMenu(inventario);
      break;
    case "5":
      await excluirProdutoMenu(inventario);
      break;
    case "0":
      console.log("\n Encerrando aplicação. Até logo!\n");
      rl.close();
      return;
    default:
      console.log("\n Opção inválida!\n");
      await pergunta("Pressione ENTER para continuar...");
  }

  await menuPrincipal(inventario);
}

// Menu: Adicionar Produto
async function adicionarProdutoMenu(inventario) {
  console.clear();
  console.log("═══════════════════════════════════════════");
  console.log("         ADICIONAR NOVO PRODUTO");
  console.log("═══════════════════════════════════════════\n");

  const nome = await pergunta("Nome do Produto: ");
  if (!nome.trim()) {
    console.log("\n Nome não pode ser vazio!\n");
    await pergunta("Pressione ENTER para continuar...");
    return;
  }

  const categoria = await pergunta("Categoria: ");
  if (!categoria.trim()) {
    console.log("\n Categoria não pode ser vazia!\n");
    await pergunta("Pressione ENTER para continuar...");
    return;
  }

  const quantidade = await pergunta("Quantidade em Estoque: ");
  if (isNaN(quantidade) || parseInt(quantidade) < 0) {
    console.log("\n Quantidade inválida!\n");
    await pergunta("Pressione ENTER para continuar...");
    return;
  }

  const preco = await pergunta("Preço (R$): ");
  if (isNaN(preco) || parseFloat(preco) < 0) {
    console.log("\n Preço inválido!\n");
    await pergunta("Pressione ENTER para continuar...");
    return;
  }

  inventario.adicionarProduto(nome.trim(), categoria.trim(), quantidade, preco);
  await pergunta("Pressione ENTER para continuar...");
}

// Menu: Listar Produtos
async function listarProdutosMenu(inventario) {
  console.clear();
  console.log("═══════════════════════════════════════════");
  console.log("            LISTAR PRODUTOS");
  console.log("═══════════════════════════════════════════\n");
  console.log("1. Listar todos");
  console.log("2. Filtrar por categoria");
  console.log("3. Ordenar produtos\n");

  const opcao = await pergunta(
    "Escolha uma opção (ou ENTER para listar todos): "
  );

  let filtroCategoria = null;
  let ordenarPor = null;

  if (opcao.trim() === "2") {
    filtroCategoria = await pergunta("Digite a categoria: ");
  } else if (opcao.trim() === "3") {
    console.log("\nOrdenar por:");
    console.log("1. Nome");
    console.log("2. Quantidade");
    console.log("3. Preço\n");
    const opcaoOrdem = await pergunta("Escolha: ");
    switch (opcaoOrdem.trim()) {
      case "1":
        ordenarPor = "nome";
        break;
      case "2":
        ordenarPor = "quantidade";
        break;
      case "3":
        ordenarPor = "preco";
        break;
    }
  }

  inventario.listarProdutos(filtroCategoria, ordenarPor);
  await pergunta("Pressione ENTER para continuar...");
}

// Menu: Buscar Produto
async function buscarProdutoMenu(inventario) {
  console.clear();
  console.log("═══════════════════════════════════════════");
  console.log("            BUSCAR PRODUTO");
  console.log("═══════════════════════════════════════════\n");
  console.log("1. Buscar por ID");
  console.log("2. Buscar por Nome\n");

  const opcao = await pergunta("Escolha uma opção: ");

  if (opcao.trim() === "1") {
    const id = await pergunta("Digite o ID do produto: ");
    const produto = inventario.buscarPorId(id);
    if (produto) {
      inventario.exibirDetalhes(produto);
    } else {
      console.log(`\n Produto com ID ${id} não encontrado.\n`);
    }
  } else if (opcao.trim() === "2") {
    const termo = await pergunta("Digite o nome (ou parte dele): ");
    const produtos = inventario.buscarPorNome(termo);
    if (produtos.length > 0) {
      console.log(`\n Encontrado(s) ${produtos.length} produto(s):\n`);
      produtos.forEach((p) => inventario.exibirDetalhes(p));
    } else {
      console.log(`\n Nenhum produto encontrado com "${termo}".\n`);
    }
  } else {
    console.log("\n Opção inválida!\n");
  }

  await pergunta("Pressione ENTER para continuar...");
}

// Menu: Atualizar Produto
async function atualizarProdutoMenu(inventario) {
  console.clear();
  console.log("═══════════════════════════════════════════");
  console.log("          ATUALIZAR PRODUTO");
  console.log("═══════════════════════════════════════════\n");

  const id = await pergunta("Digite o ID do produto: ");
  const produto = inventario.buscarPorId(id);

  if (!produto) {
    console.log(`\n Produto com ID ${id} não encontrado.\n`);
    await pergunta("Pressione ENTER para continuar...");
    return;
  }

  console.log("\nProduto atual:");
  inventario.exibirDetalhes(produto);

  console.log("Deixe em branco para manter o valor atual.\n");

  const nome = await pergunta(`Nome [${produto.nome}]: `);
  const categoria = await pergunta(`Categoria [${produto.categoria}]: `);
  const quantidade = await pergunta(`Quantidade [${produto.quantidade}]: `);
  const preco = await pergunta(`Preço [${produto.preco.toFixed(2)}]: `);

  const dadosAtualizados = {};
  if (nome.trim()) dadosAtualizados.nome = nome.trim();
  if (categoria.trim()) dadosAtualizados.categoria = categoria.trim();
  if (quantidade.trim() && !isNaN(quantidade))
    dadosAtualizados.quantidade = quantidade;
  if (preco.trim() && !isNaN(preco)) dadosAtualizados.preco = preco;

  if (Object.keys(dadosAtualizados).length > 0) {
    inventario.atualizarProduto(id, dadosAtualizados);
  } else {
    console.log("\n⚠ Nenhuma alteração realizada.\n");
  }

  await pergunta("Pressione ENTER para continuar...");
}

// Menu: Excluir Produto
async function excluirProdutoMenu(inventario) {
  console.clear();
  console.log("═══════════════════════════════════════════");
  console.log("           EXCLUIR PRODUTO");
  console.log("═══════════════════════════════════════════\n");

  const id = await pergunta("Digite o ID do produto: ");
  const produto = inventario.buscarPorId(id);

  if (!produto) {
    console.log(`\n Produto com ID ${id} não encontrado.\n`);
    await pergunta("Pressione ENTER para continuar...");
    return;
  }

  console.log("\nProduto a ser excluído:");
  inventario.exibirDetalhes(produto);

  const confirmacao = await pergunta("Tem certeza que deseja excluir? (S/N): ");
  if (confirmacao.trim().toUpperCase() === "S") {
    inventario.excluirProduto(id);
  } else {
    console.log("\n⚠ Exclusão cancelada.\n");
  }

  await pergunta("Pressione ENTER para continuar...");
}

// Iniciar aplicação
async function iniciar() {
  const inventario = new InventarioAgilStore();
  await menuPrincipal(inventario);
}

iniciar();
