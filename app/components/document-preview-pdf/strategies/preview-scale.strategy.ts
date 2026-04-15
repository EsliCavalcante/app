type ScaleRule = {
	match: (width: number) => boolean;
	scale: number;
};

const scaleRules: ScaleRule[] = [
	{ match: (width) => width >= 768, scale: 0.25 },
	{ match: (width) => width <= 425, scale: 0.9 },
];

export function getScale(width: number) {
	const rule = scaleRules.find((scaleRule) => scaleRule.match(width));
	return rule?.scale ?? 0.6;
}
