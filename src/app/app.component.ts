import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  hora = '';
  ciudad = 'Buenos Aires';
  temperatura = '';
  estado = '';
  icono = '☀️';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.actualizarHora();
    setInterval(() => this.actualizarHora(), 1000);

    this.obtenerClima();
    setInterval(() => this.obtenerClima(), 30 * 60 * 1000); // cada 30 minutos
  }

  actualizarHora() {
    const ahora = new Date();

    this.hora = ahora.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  obtenerClima() {
    this.http
      .get<any>(
        'https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&current=temperature_2m,weather_code,is_day',
      )
      .subscribe((res) => {
        this.temperatura = `${Math.round(res.current.temperature_2m)}°C`;

        const codigo = res.current.weather_code;
        const esDeDia = res.current.is_day === 1;

        switch (codigo) {
          case 0:
            this.estado = esDeDia ? 'Despejado' : 'Despejado';
            this.icono = esDeDia ? '☀️' : '🌙';
            break;

          case 1:
          case 2:
            this.estado = 'Parcialmente nublado';
            this.icono = esDeDia ? '🌤️' : '🌙';
            break;

          case 3:
            this.estado = 'Nublado';
            this.icono = '☁️';
            break;

          case 45:
          case 48:
            this.estado = 'Niebla';
            this.icono = '🌫️';
            break;

          case 51:
          case 53:
          case 55:
          case 61:
          case 63:
          case 65:
            this.estado = 'Lluvia';
            this.icono = '🌧️';
            break;

          case 71:
          case 73:
          case 75:
            this.estado = 'Nieve';
            this.icono = '❄️';
            break;

          case 95:
            this.estado = 'Tormenta';
            this.icono = '⛈️';
            break;

          default:
            this.estado = 'Clima';
            this.icono = '🌡️';
        }
      });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    document.body.style.setProperty('--x', `${event.clientX}px`);
    document.body.style.setProperty('--y', `${event.clientY}px`);
  }
}
