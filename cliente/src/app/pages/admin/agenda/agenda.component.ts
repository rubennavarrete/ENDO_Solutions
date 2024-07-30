import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { AgendaService } from 'src/app/core/services/agenda.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#00a803',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AgendaComponent {


  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: { primary: '#1e90ff', secondary: '#D1E8FF'},
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: { primary: '#e3bc08', secondary: '#FDF1BA'},
  //     actions: this.actions,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'Un evento con fecha de inicio',
  //     color: { primary: '#e3ff08', secondary: '#FDF1BA'},
  //     actions: this.actions,
  //   },
  //   {
  //     start: new Date('2024-07-10T10:00:00'),
  //     end: new Date('2024-07-10T12:00:00'),
  //     title: 'Evento de prueba',
  //     color: {
  //       primary: '#1e90ff',
  //       secondary: '#D1E8FF'
  //     }
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: { primary: '#ad2121', secondary: '#FAE3E3'},
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: { primary: '#1e90ff', secondary: '#D1E8FF'},
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  constructor(
    private srvAgenda: AgendaService
  ) {}

  
  ngOnInit(): void {
    this.srvAgenda.getAgendas().subscribe((events: any[]) => {
      if (Array.isArray(events)) {
        this.events = events.map(event => ({
          ...event,
          start: new Date(event.start),
          end: event.end ? new Date(event.end) : null,
          color: {
            primary: event.color?.primary ?? '#1e90ff',
            secondary: event.color?.secondary ?? '#D1E8FF'
          },
          // actions: this.actions,
          actions: [
            {
              label: '<i class="fas fa-fw fa-pencil-alt"></i>',
              a11yLabel: 'Edit',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
              },
            },
            {
              label: '<i class="fas fa-fw fa-trash-alt"></i>',
              a11yLabel: 'Delete',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.handleEvent('Deleted', event);
              },
            },
          ],
        }));
        this.refresh.next();
      } else {
        console.error('Expected an array of events');
      }
    }, error => {
      console.error('Error fetching events', error);
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('Evento:', event);
    console.log('Acción:', action);
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    if (action === 'Edited') {
      // Lógica para editar el evento
      console.log('Editar evento:', event);
    } else if (action === 'Deleted') {
      // Lógica para eliminar el evento
      console.log('Eliminar evento:', event);
      this.deleteEvent(event);
    }
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        // color: 
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }
  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
