# PW

# Instalação da API:

Clone o repositório:
bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
Navegue até o diretório do projeto:
bash
Copiar código
cd backend
Crie e ative um ambiente virtual:
bash
Copiar código
python -m venv venv
source venv/bin/activate  # No Windows use `venv\Scripts\activate`
Instale as dependências:
bash
Copiar código
pip install -r requirements.txt
Inicie o servidor FastAPI:
bash
Copiar código
uvicorn app.main:app --reload