import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.page.html',
  styleUrls: ['./pomodoro.page.scss'],
})
export class PomodoroPage implements OnInit {
  // Time variables
  timeLeft = 25 * 60; // 25 minutes in seconds
  displayTime = '25:00';
  isRunning = false;

  // Pomodoro phases
  pomodorosCompleted = 0;
  phaseMessage = 'Trabalhe na sua tarefa';
  timerInterval: any;

  ngOnInit() {
    this.updateDisplayTime();
  }

  // Start the timer
  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.updateDisplayTime();
        } else {
          this.timerEnd();
        }
      }, 1000);
    }
  }

  // Pause the timer
  pauseTimer() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
  }

  // Reset the timer
  resetTimer() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    this.timeLeft = 25 * 60; // Reset to 25 minutes
    this.phaseMessage = 'Trabalhe na sua tarefa';
    this.updateDisplayTime();
  }

  // Update the display time (MM:SS format)
  updateDisplayTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.displayTime = `${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  // Pad single digits with a leading zero
  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // Handle the end of the timer
  timerEnd() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    this.playAlarm();

    // Determine the next phase
    this.pomodorosCompleted++;
    if (this.pomodorosCompleted % 4 === 0) {
      this.phaseMessage = 'Faça uma pausa longa de 15 a 30 minutos';
      this.timeLeft = 15 * 60; // 15 minutes for a long break
    } else {
      this.phaseMessage = 'Faça uma pausa curta de 5 minutos';
      this.timeLeft = 5 * 60; // 5 minutes for a short break
    }

    this.updateDisplayTime();
  }

  // Play alarm sound
  playAlarm() {
    const audio = new Audio('assets/alarme.mp3');
    audio.play();
  }
}
