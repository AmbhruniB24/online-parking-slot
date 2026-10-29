import { useEffect } from 'react';
import { socket } from '../services/socket';

export function useSocket(
  onSlotUpdated,
  onSlotCreated,
  onSlotDeleted,
  onBookingConfirmed
) {
  useEffect(() => {
    if (onSlotUpdated) {
      socket.on('slot_status_updated', onSlotUpdated);
    }

    if (onSlotCreated) {
      socket.on('slot_created', onSlotCreated);
    }

    if (onSlotDeleted) {
      socket.on('slot_deleted', onSlotDeleted);
    }

    if (onBookingConfirmed) {
      socket.on('booking_confirmed', onBookingConfirmed);
    }

    return () => {
      if (onSlotUpdated) {
        socket.off('slot_status_updated', onSlotUpdated);
      }

      if (onSlotCreated) {
        socket.off('slot_created', onSlotCreated);
      }

      if (onSlotDeleted) {
        socket.off('slot_deleted', onSlotDeleted);
      }

      if (onBookingConfirmed) {
        socket.off('booking_confirmed', onBookingConfirmed);
      }
    };
  }, [
    onSlotUpdated,
    onSlotCreated,
    onSlotDeleted,
    onBookingConfirmed
  ]);

  return { socket };
}