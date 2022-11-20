const Joi = require('joi');

// const ruleId = Joi.number().integer();
const ruleId = Joi.string().length(24);
const ruleUserName = Joi.string().alphanum().min(3).max(30);
const rulePassword = Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required();
const ruleAccessToken = Joi.string();
const ruleEmail = Joi.string().email({ minDomainSegments: 1, tlds: { allow: ['com', 'net', 'ua'] } });
const rulesFind = Joi.object({
    id: ruleId,
    username: ruleUserName,
    email: ruleEmail,
});
const rulesCreate = Joi.object({
    username: ruleUserName.required(),
    password: rulePassword.required(),
    repeat_password: Joi.ref('password'),
    access_token: ruleAccessToken,
    email: ruleEmail.required(),
});
const rulesDelete = Joi.object({
    id: ruleId.required(),
});
const rulesUpdate = rulesCreate.concat(rulesDelete);
const rulesSingIn = Joi.object({
    username: ruleUserName.required(),
    password: rulePassword.required(),
});
const rulesAcconut = Joi.object({
    access_token: ruleAccessToken.required(),
});

module.exports = {
    find: rulesFind,
    create: rulesCreate,
    update: rulesUpdate,
    delete: rulesDelete,
    singIn: rulesSingIn,
    account: rulesAcconut,
};
