export const isDeadlineSoon = deadline => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDifference = deadlineDate - now;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference <= 24;
  };
  
  export const getPriorityClasses = priority => {
    switch (priority) {
      case 'Low':
        return 'low';
      case 'Medium':
        return 'medium';
      case 'High':
        return 'high';
      case 'Without priority':
        return 'withoutPriority';
      default:
        return '';
    }
  };
