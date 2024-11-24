import { Component } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: any[] = [];
  newTask = {
    title: '',
    category: '',
    priority: '',
    dueDate: new Date(),
    completed: false,
  };

  filter: string = 'all';

  constructor(private toastController: ToastController) {
    this.loadTasks();
    this.checkTasks(); // Verifica tarefas ao carregar a página
  }

  // Função para adicionar uma nova tarefa
  addTask() {
    if (
      !this.newTask.title ||
      !this.newTask.category ||
      !this.newTask.priority
    ) {
      console.log('Preencha todos os campos antes de adicionar a tarefa.');
      return;
    }
    this.tasks.push({ ...this.newTask });
    this.newTask = {
      title: '',
      category: '',
      priority: '',
      dueDate: new Date(),
      completed: false,
    };
    this.saveTasks();
    this.checkTasks(); 
    this.triggerHapticFeedback();
  }

  // Função para deletar uma tarefa
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.checkTasks(); // Verifica tarefas após deletar
  }

  // Função para alternar o estado da tarefa (concluída ou pendente)
  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
    this.checkTasks(); // Atualiza notificações após conclusão/pendência
  }

  // Função para salvar tarefas no localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Função para carregar tarefas do localStorage
  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  // Função para obter tarefas filtradas com base no filtro atual
  getFilteredTasks() {
    if (this.filter === 'all') {
      return this.tasks;
    } else if (this.filter === 'active') {
      return this.tasks.filter((task) => !task.completed);
    } else if (this.filter === 'completed') {
      return this.tasks.filter((task) => task.completed);
    }
    return this.tasks;
  }

  // Método para disparar feedback háptico
  async triggerHapticFeedback() {
    await Haptics.impact({
      style: ImpactStyle.Medium
    });
  }

  // Método para verificar tarefas e enviar notificações
  async checkTasks() {
    const now = new Date();
  
    // Tarefas próximas do vencimento (em até 2 dias)
    const upcomingTasks = this.tasks.filter((task) => {
      if (task.completed) return false; // Ignora tarefas concluídas
      const dueDate = new Date(task.dueDate);
      const timeDifference = dueDate.getTime() - now.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      return daysDifference <= 2 && daysDifference >= 0;
    });
  
    // Tarefas atrasadas
    const overdueTasks = this.tasks.filter((task) => {
      if (task.completed) return false; // Ignora tarefas concluídas
      const dueDate = new Date(task.dueDate);
      return dueDate < now;
    });
  
    // Notifica tarefas próximas do vencimento
    if (upcomingTasks.length > 0) {
      await this.showToast(
        `Você tem ${upcomingTasks.length} tarefa(s) próximas do vencimento!`,
        'warning'
      );
    }
  
    // Notifica tarefas atrasadas
    if (overdueTasks.length > 0) {
      await this.showToast(
        `Você tem ${overdueTasks.length} tarefa(s) atrasada(s)!`,
        'danger'
      );
    }
  }

  // Função para exibir notificações (Toast)
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top',
    });
    await toast.present();
  }
}
