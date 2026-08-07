const formatTime = (time24: string) => {
    const hour = parseInt(time24.split(":")[0], 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12}:00 ${ampm}`;
};

export default formatTime;