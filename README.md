# Automação de Matrículas 4Blue - n8n Self-Hosted & 4blue Cloud

## 🎯 Desafio Técnico Individual

### Desafio Oculto Identificado:
A mesma matrícula pode ser persistida mais de uma vez no banco de dados. 
**Solução:** Antes da persistência de uma matrícula no banco, o email (dado único) precisa ser verificado na base para garantir que não haja duplicatas. Caso haja, irá responder de forma negativa ao Webhook.

### Tecnologias Self-Hosted:
- Redis (for queue execution mode)
- PostgreSQL
- Docker Compose
- Gmail (transacional)
- n8n (self-hosted via Docker)

### Como rodar localmente:
```bash
cp .env.example .env
docker-compose up -d
# Acesse http://localhost:5678
```

**Talvez seja necessário iniciar os containeres mais uma vez após sua criação**