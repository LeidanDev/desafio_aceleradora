import datetime

# Definição das estruturas de dados
pacientes = []
agendamentos = []

# Função para verificar se o número de telefone já está cadastrado
def telefone_existe(telefone):
    for paciente in pacientes:
        if paciente["telefone"] == telefone:
            return True
    return False

# Função para cadastrar um paciente
def cadastrar_paciente():
    try:
        nome = input("Digite o nome do paciente: ")
        telefone = input("Digite o telefone do paciente: ")
        
        if telefone_existe(telefone):
            raise ValueError("Paciente já cadastrado!")
        
        pacientes.append({"nome": nome, "telefone": telefone})
        print("Paciente cadastrado com sucesso!")
    
    except ValueError as ve:
        print(ve)
    
    except Exception as e:
        print(f"Erro ao cadastrar paciente: {e}")

# Função para listar os pacientes cadastrados
def listar_pacientes():
    print("Lista de Pacientes Cadastrados:")
    for idx, paciente in enumerate(pacientes, start=1):
        print(f"{idx}. Nome: {paciente['nome']}, Telefone: {paciente['telefone']}")

# Função para verificar se há conflito de horário para a marcação de consulta
def horario_disponivel(dia, hora):
    for agendamento in agendamentos:
        if agendamento["dia"] == dia and agendamento["hora"] == hora:
            return False
    return True

# Função para marcar uma consulta
def marcar_consulta():
    try:
        if len(pacientes) == 0:
            raise ValueError("Não há pacientes cadastrados para marcar consulta.")
        
        print("Escolha o paciente para marcar consulta:")
        for idx, paciente in enumerate(pacientes, start=1):
            print(f"{idx}. {paciente['nome']}")
        
        escolha = int(input("Digite o número correspondente ao paciente: "))
        paciente_escolhido = pacientes[escolha - 1]
        
        dia = input("Digite o dia da consulta (dd/mm/aaaa): ")
        hora = input("Digite a hora da consulta (hh:mm): ")
        
        # Verificar se a data da consulta é posterior à data atual
        data_consulta = datetime.datetime.strptime(dia, "%d/%m/%Y")
        data_atual = datetime.datetime.now()
        
        if data_consulta <= data_atual:
            raise ValueError("Não é possível agendar consultas para datas passadas.")
        
        # Verificar se o horário está disponível
        if not horario_disponivel(dia, hora):
            raise ValueError("Horário indisponível. Já existe uma consulta marcada para este dia e hora.")
        
        agendamentos.append({
            "paciente": paciente_escolhido["nome"],
            "dia": dia,
            "hora": hora,
            "especialidade": input("Digite a especialidade desejada para a consulta: ")
        })
        print("Consulta marcada com sucesso!")
    
    except (IndexError, ValueError) as e:
        print(f"Erro: {e}")

# Função para cancelar uma consulta
def cancelar_consulta():
    try:
        if len(agendamentos) == 0:
            raise ValueError("Não há agendamentos para cancelar.")
        
        print("Escolha o agendamento que deseja cancelar:")
        for idx, agendamento in enumerate(agendamentos, start=1):
            print(f"{idx}. Paciente: {agendamento['paciente']}, Data: {agendamento['dia']}, Hora: {agendamento['hora']}, Especialidade: {agendamento['especialidade']}")
        
        escolha = int(input("Digite o número correspondente ao agendamento: "))
        agendamento_cancelado = agendamentos.pop(escolha - 1)
        print(f"Consulta do paciente {agendamento_cancelado['paciente']} cancelada com sucesso!")
    
    except (IndexError, ValueError) as e:
        print(f"Erro: {e}")

# Função principal do programa
def main():
    while True:
        print("\n===== Sistema de Gestão de Consultas =====")
        print("1. Cadastrar um paciente")
        print("2. Marcar consulta")
        print("3. Cancelar consulta")
        print("4. Listar pacientes cadastrados")
        print("5. Sair do programa")
        
        escolha = input("Escolha uma opção: ")
        
        if escolha == "1":
            cadastrar_paciente()
        elif escolha == "2":
            marcar_consulta()
        elif escolha == "3":
            cancelar_consulta()
        elif escolha == "4":
            listar_pacientes()
        elif escolha == "5":
            print("Encerrando o programa...")
            break
        else:
            print("Opção inválida. Escolha novamente.")

if __name__ == "__main__":
    main()
