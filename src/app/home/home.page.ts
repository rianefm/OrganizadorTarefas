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

  filter: string = 'all'; 

  constructor() {
    this.loadTasks(); 
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
  }

  // Função para deletar uma tarefa
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks(); 
  }

  // Função para alternar o estado da tarefa (concluída ou pendente)
  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks(); 
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

    return this.tasks; 
  }
}
