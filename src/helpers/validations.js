export function validateEmail(text) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

// rules
const avaliableRules = {
    required(value) {
        return value ? '' : 'Pole wymagane';
    },
    min(value, rule) {
        return value.length > rule.length ? '' : `Min. znaków: ${rule.length}`;
    },
    email(value) {
        return validateEmail(value) ? '' : 'Niepoprawny email'
    }
};

// validation
export function validate(rules = [], value) {
    for (let i = 0; i < rules.length; i++){
        const rule = rules[i]

        if (rule instanceof Object) {
            const errorMessage = avaliableRules[rule.rule](value, rule);
            if (errorMessage) {
                return errorMessage
            }
        } else {
            const errorMessage = avaliableRules[rule](value);
            if (errorMessage) {
                return errorMessage;
            }
        };
    }

    return '';
}