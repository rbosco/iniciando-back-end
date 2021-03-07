# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano(background job);

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do Perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

## **RNF**

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados.
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis de um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores devem ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h(Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

# Teste Unitários com Jest

- Testes com implementações fakes de funcionalidades específicas para não depender do banco

# Integração AMAZON S3

- Amazon S3 = CDN(Content Delivery Network)
- Os servidores, hoje em dia, são otimizados para perfomance da aplicação com
  espeçao em disco
- Como estão oferecendo SSD´s (10gb, 20gb, ou mais) muito mais rápidos - os espaços
  que temos para aplicação é menor.
- Por isso, não é ideal salvar imagens ou arquivos na aplicação. Irá pesar muito.
- O Node facilita escalar uma aplicação na horizontal para que mais usuários
  possam utilizá-la. O que significa?
- Escala vertical: Aplicação está lenta = Aumento de recursos
- Escala horizontal:Aplicação está lenta = Cria um novo servidor e executa
  sua aplicação em dois servidores diferentes distribuindo cargas
- Logo, se você tem 2 servidores com a mesma aplicação dentro, como você irá controlar os
  arquivos físicos?
- A sugestão é armazenar num CDN

# MongoDB

- Apenas para notificações

# Redis

- Cache Provider
- Ambiente performático para entrega de dados com maior velocidade
- Permite que a aplicação faça queries no banco de dados postgres apenas quando
  os dados dentro de uma determinada tabela mudarem, e quando isso não acontecer
  é o REDIS o responsável em prover os dados.
- É mais rápido que o postgres e evita que nossa aplicação perca tempo fazendo queries
  desnecessárias.
- Não tem tabela. Não conseguimos salvar dados estruturados
- Imagine que temos uma grande tabela com 2 colunas: chave e valor.

# Segurança a ataques DDoS

- Utilizando a biblioteca rate-limiter-flexible
- Essa ferramenta salve num banco de dados predefinido o IP de cada usuário que acessa
  a aplicação e, junto ao IP, salve também o timestamp em que o acesso ocorreu para assim,
  fazer a tratativa de negar ou não o acesso desse usuário e assim, previnir um ataque.
