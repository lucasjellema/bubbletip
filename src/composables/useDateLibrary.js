export function useDateLibrary() {



const formatDate = (date) => {
    if (date == null) return
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('nl-NL', options);
  }

  return { formatDate };
}
