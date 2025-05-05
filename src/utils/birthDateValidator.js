const isValidBirthDate = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    const age = today.getFullYear() - birth.getFullYear();
    const has18Years =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

    return age > 18 || (age === 18 && has18Years);
}

export default isValidBirthDate;