describe('Debug stdin', () => {
  it('should show stdin properties', () => {
    console.log('=== STDIN DEBUG ===');
    console.log('stdin:', process.stdin);
    console.log('stdin.isTTY:', process.stdin.isTTY);
    console.log('stdin.ref:', process.stdin.ref);
    console.log('typeof stdin.ref:', typeof process.stdin.ref);
  });
});
