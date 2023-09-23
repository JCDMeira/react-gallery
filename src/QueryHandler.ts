export class QueryHandler {
  static setQuey = (key: string, value: string) => {
    if ("URLSearchParams" in window) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    }
  };
  static getQuey = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key) || "";
  };
}
