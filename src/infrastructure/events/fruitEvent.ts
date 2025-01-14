export class FruitEvents {
  static emit(event: string, data: any) {
    console.log(`Event: ${event}`, data);
  }
}