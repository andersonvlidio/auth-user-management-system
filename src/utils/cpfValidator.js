const isValidCPF = (cpf) => {
    const sanitizedCPF = cpf.replace(/[^\d]/g, '');

    if (sanitizedCPF.length !== 11) {
        return false;
    }
    const cpfRegex = /^\d{11}$/;
    return cpfRegex.test(sanitizedCPF);
}

export default isValidCPF;