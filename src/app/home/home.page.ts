import { Component } from '@angular/core';

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

  filter: string = 'all'; // Variável para armazenar o filtro atual

  constructor() {
    this.loadTasks(); // Carregar tarefas ao inicializar
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
    this.saveTasks(); // Salvar as tarefas após adicionar
  }

  // Função para deletar uma tarefa
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks(); // Salvar as tarefas após deletar
  }

  // Função para alternar o estado da tarefa (concluída ou pendente)
  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks(); // Salvar as tarefas após alterar o estado
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

  // Função para alternar o modo escuro
  toggleDarkMode() {
    document.body.classList.toggle('dark');
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

    return this.tasks; // Retorne todas as tarefas por padrão
  }
}
