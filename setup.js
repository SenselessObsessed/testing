Object.defineProperty(global, "localStorage", {
  value: {
    getItem: jest.fn().mockReturnValue("hello world!"),
  },
  writable: true,
});
