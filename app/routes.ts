import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	route("/", "routes/layout.tsx", [
		index("routes/home.tsx"),
		route("document-preview", "routes/document-preview-route.tsx"),
	]),
	route("/import-file", "routes/layout-file-import-xlsx-route.tsx", [
		index("routes/file-import-xlsx-route.tsx"),
	]),
] satisfies RouteConfig;

// layout-file-import-xlsx-route.tsx
