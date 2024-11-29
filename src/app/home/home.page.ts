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
    this.checkTasks();
  }

  async addTask() {
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
    await this.showToast('Tarefa adicionada com sucesso!', 'success');
  }

  async deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.checkTasks();
    await this.showToast('Tarefa excluída com sucesso!', 'danger');
  }

  async toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
    this.checkTasks();
    const message = this.tasks[index].completed
      ? 'Tarefa marcada como concluída!'
      : 'Tarefa marcada como pendente!';
    const color = this.tasks[index].completed ? 'success' : 'warning';
    await this.showToast(message, color);
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

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

  async triggerHapticFeedback() {
    await Haptics.impact({
      style: ImpactStyle.Medium,
    });
  }

  async checkTasks() {
    const now = new Date();

    const upcomingTasks = this.tasks.filter((task) => {
      if (task.completed) return false;
      const dueDate = new Date(task.dueDate);
      const timeDifference = dueDate.getTime() - now.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      return daysDifference <= 2 && daysDifference >= 0;
    });

    const overdueTasks = this.tasks.filter((task) => {
      if (task.completed) return false;
      const dueDate = new Date(task.dueDate);
      return dueDate < now;
    });

    if (upcomingTasks.length > 0) {
      await this.showToast(
        `Você tem ${upcomingTasks.length} tarefa(s) próximas do vencimento!`,
        'warning'
      );
    }

    if (overdueTasks.length > 0) {
      await this.showToast(
        `Você tem ${overdueTasks.length} tarefa(s) atrasada(s)!`,
        'danger'
      );
    }
  }

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
