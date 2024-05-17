export class Time {
    static timeAgo(unixTimestampMillis: number) {
        const now = Math.floor(Date.now() / 1000);
        const unixTimestamp = Math.floor(unixTimestampMillis / 1000);
        const timeDifference = now - unixTimestamp;
        if (timeDifference < 60) {
            return `Hace ${timeDifference} segundos`;
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
        }
    }

    static format (stringDate:string) {
        const date = new Date(stringDate);

        const nombresMeses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const day = date.getDate();
        const month = nombresMeses[date.getMonth()];
        const year = date.getFullYear() % 100;

        return`${day} de ${month}`;
    }

    static remainingTime2(unixTimestampMillis:number)  {
        const currentDate = new Date().getTime();
        const diff = unixTimestampMillis - currentDate;
      
        if (diff <= 0) {
          const pastTense = Math.abs(diff);
          const seconds = Math.floor((pastTense / 1000) % 60);
          const min = Math.floor((pastTense / (1000 * 60)) % 60);
          const hours = Math.floor((pastTense / (1000 * 60 * 60)) % 24);
          const days = Math.floor(pastTense / (1000 * 60 * 60 * 24));
      
          let messagePased = '';
          if (days > 0) {
            messagePased += `${days} día${days !== 1 ? 's' : ''}, `;
          }
          if (hours > 0) {
            messagePased += `${hours} hora${hours !== 1 ? 's' : ''}, `;
          }
          if (min > 0) {
            messagePased += `${min} minuto${min !== 1 ? 's' : ''}, `;
          }
          messagePased += `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
      
          return `Expiro hace ${messagePased}`;
        }
      
        const seconds = Math.floor((diff / 1000) % 60);
        const min = Math.floor((diff / (1000 * 60)) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
        let message = '';
        if (days > 0) {
          message += `${days} día${days !== 1 ? 's' : ''}, `;
        }
        if (hours > 0) {
          message += `${hours} hora${hours !== 1 ? 's' : ''}, `;
        }
        if (min > 0) {
          message += `${min} minuto${min !== 1 ? 's' : ''}, `;
        }
        message += `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
      
        return `Expira en ${message}`;
    }
      
}