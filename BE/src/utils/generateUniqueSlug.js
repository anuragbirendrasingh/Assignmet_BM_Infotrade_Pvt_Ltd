const Form = require('../models/Form');
const createSlug = require('./slug');


async function generateUniqueSlug(title) {
const base = createSlug(title || 'form');
const regex = new RegExp(`^${base}(-\\d+)?$`);
const forms = await Form.find({ slug: regex }).select('slug').lean();
const slugs = forms.map((f) => f.slug);
if (!slugs.includes(base)) return base;


let max = 0;
slugs.forEach((s) => {
const m = s.match(new RegExp(`^${base}-(\\d+)$`));
if (m && m[1]) max = Math.max(max, Number(m[1]));
});


return `${base}-${max + 1}`;
}


module.exports = generateUniqueSlug;