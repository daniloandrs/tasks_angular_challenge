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
}