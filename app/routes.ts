import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	route("/", "routes/layout.tsx", [
		index("routes/home.tsx"),
		route("document-preview", "routes/document-preview-route.tsx"),
	]),
] satisfies RouteConfig;
