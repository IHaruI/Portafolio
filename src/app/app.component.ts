import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { loadSlim } from '@tsparticles/slim';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  hora = '';
  ciudad = 'Buenos Aires';
  temperatura = '';
  estado = '';
  icono = '☀️';
  private particlesCargadas = false;
  private particlesInicializadas = false;
  private particlesActuales: any;

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
    if (window.innerWidth <= 480) return;

    document.body.style.setProperty('--x', `${event.clientX}px`);
    document.body.style.setProperty('--y', `${event.clientY}px`);
  }

  @HostListener('window:resize')
  onResize() {
    this.controlarParticulas();
  }

  async ngAfterViewInit() {
    this.controlarParticulas();
  }

  async controlarParticulas() {
    if (window.innerWidth <= 480 && !this.particlesCargadas) {
      const { tsParticles } = await import('@tsparticles/engine');

      if (!this.particlesInicializadas) {
        await loadSlim(tsParticles);
        this.particlesInicializadas = true;
      }

      this.particlesActuales = await tsParticles.load({
        id: 'particles-mobile',

        options: {
          background: {
            color: {
              value: 'transparent',
            },
          },

          fpsLimit: 60,

          particles: {
            number: {
              value: 28,
            },

            color: {
              value: ['#8b5cf6', '#6366f1', '#d946ef'],
            },

            opacity: {
              value: {
                min: 0.25,
                max: 0.55,
              },
            },

            size: {
              value: {
                min: 2,
                max: 7,
              },
            },

            move: {
              enable: true,
              speed: 0.35,
              random: true,
              straight: false,

              outModes: {
                default: 'bounce',
              },
            },

            links: {
              enable: false,
            },

            twinkle: {
              particles: {
                enable: true,
                frequency: 0.03,
                opacity: 1,
              },
            },
          },

          interactivity: {
            events: {
              onHover: {
                enable: false,
              },

              onClick: {
                enable: false,
              },
            },
          },
        },
      });

      this.particlesCargadas = true;
    }

    if (window.innerWidth > 480 && this.particlesCargadas) {
      this.particlesActuales?.destroy();
      this.particlesActuales = null;
      this.particlesCargadas = false;
    }
  }
}
