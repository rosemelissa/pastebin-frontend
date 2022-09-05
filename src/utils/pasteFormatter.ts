function pasteFormatter(paste: string, reveal: boolean): string[] {
  if (reveal) {
    return paste.split("\n");
  } else {
    return paste.split("\n").splice(0, 5);
  }
}

export default pasteFormatter;
