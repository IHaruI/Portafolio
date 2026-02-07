import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type Vista = 'dashboard' | 'focus' | 'tasks';

interface Task {
  id: number;
  titulo: string;
  completada: boolean;
}

@Component({
  selector: 'app-app-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app-tasks.component.html',
  styleUrl: './app-tasks.component.css',
})
export class AppTasksComponent implements OnInit {
  private STORAGE_KEY = 'focusFlowData';

  vistaActual: Vista = 'dashboard';

  tareas: Task[] = [];
  nuevaTarea = '';
  private idCounter = 1;

  minutosSeleccionados = 25;
  focusTiempo = 25 * 60;
  focusActivo = false;
  intervalId: any = null;
  tareaEnFocus: Task | null = null;

  private alarma = new Audio('/sound/alarma.mp3');

  mostrarMensaje = false;
  mensajeTexto = '';

  // ===== TIMER VISUAL =====
  radio = 90;
  circunferencia = 2 * Math.PI * this.radio;
  tiempoInicial = this.minutosSeleccionados * 60;

  ngOnInit() {
    this.cargarDatos();
    this.tiempoInicial = this.minutosSeleccionados * 60;
  }

  cambiarVista(vista: Vista) {
    this.vistaActual = vista;
  }

  // ================= STORAGE =================

  guardarDatos() {
    const data = {
      tareas: this.tareas,
      minutosSeleccionados: this.minutosSeleccionados,
      focusTiempo: this.focusTiempo,
      tareaEnFocusId: this.tareaEnFocus?.id ?? null,
      idCounter: this.idCounter,
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  cargarDatos() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);

    this.tareas = data.tareas ?? [];
    this.minutosSeleccionados = data.minutosSeleccionados ?? 25;
    this.focusTiempo = data.focusTiempo ?? this.minutosSeleccionados * 60;
    this.idCounter = data.idCounter ?? 1;

    if (data.tareaEnFocusId) {
      this.tareaEnFocus =
        this.tareas.find((t) => t.id === data.tareaEnFocusId) ?? null;
    }

    this.tiempoInicial = this.minutosSeleccionados * 60;
  }

  // ================= TASKS =================

  agregarTarea() {
    if (!this.nuevaTarea.trim()) return;

    this.tareas.push({
      id: this.idCounter++,
      titulo: this.nuevaTarea,
      completada: false,
    });

    this.nuevaTarea = '';
    this.guardarDatos();
  }

  toggleTarea(task: Task) {
    task.completada = !task.completada;
    this.guardarDatos();
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter((t) => t.id !== id);

    if (this.tareaEnFocus?.id === id) {
      this.quitarTareaFocus();
    }

    this.guardarDatos();
  }

  get tareasPendientes() {
    return this.tareas.filter((t) => !t.completada).length;
  }

  get tareasCompletadas() {
    return this.tareas.filter((t) => t.completada).length;
  }

  // ================= VALIDACION =================

  validarMinutos(valor: any) {
    let numero = Number(valor);

    if (isNaN(numero)) numero = 1;

    numero = Math.floor(numero);

    if (numero < 1) numero = 1;
    if (numero > 60) numero = 60;

    this.minutosSeleccionados = numero;

    if (!this.focusActivo) {
      this.focusTiempo = numero * 60;
      this.tiempoInicial = this.focusTiempo;
    }

    this.guardarDatos();
  }

  bloquearTeclasInvalidas(event: KeyboardEvent) {
    const invalidas = ['e', 'E', '+', '-', ',', '.'];
    if (invalidas.includes(event.key)) event.preventDefault();
  }

  // ================= TIMER =================

  iniciarFocus() {
    if (this.focusActivo || !this.tareaEnFocus) return;

    if (this.focusTiempo <= 0) {
      this.focusTiempo = this.minutosSeleccionados * 60;
    }

    this.tiempoInicial = this.focusTiempo;
    this.focusActivo = true;

    this.intervalId = setInterval(() => {
      if (this.focusTiempo > 0) {
        this.focusTiempo--;
        this.guardarDatos();
      } else {
        this.finalizarFocus();
      }
    }, 1000);
  }

  detenerFocus() {
    this.focusActivo = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.guardarDatos();
  }

  resetFocus() {
    this.detenerFocus();
    this.focusTiempo = this.minutosSeleccionados * 60;
    this.tiempoInicial = this.focusTiempo;
    this.guardarDatos();
  }

  finalizarFocus() {
    this.detenerFocus();
    this.reproducirAlarma();

    this.mostrarToast('⏰ Tiempo finalizado — Buen trabajo 💪');

    this.focusTiempo = this.minutosSeleccionados * 60;
    this.tiempoInicial = this.focusTiempo;
    this.guardarDatos();
  }

  reproducirAlarma() {
    this.alarma.currentTime = 0;
    this.alarma.play().catch(() => {});
  }

  // ===== PROGRESO CIRCULAR =====

  get progresoOffset() {
    const progreso = this.focusTiempo / this.tiempoInicial;
    return this.circunferencia * (1 - progreso);
  }

  get focusFormateado(): string {
    const min = Math.floor(this.focusTiempo / 60);
    const sec = this.focusTiempo % 60;

    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  }

  seleccionarTareaFocus(task: Task) {
    this.tareaEnFocus = task;
    this.guardarDatos();
  }

  quitarTareaFocus() {
    this.tareaEnFocus = null;
    this.detenerFocus();
    this.guardarDatos();
  }

  mostrarToast(texto: string) {
    this.mensajeTexto = texto;
    this.mostrarMensaje = true;

    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 5000);
  }
}
