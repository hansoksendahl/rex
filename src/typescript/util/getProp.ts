// NOTE This utility class enables indexing of properties from a generic type.
//      It will be made obsolete when partial type argument inferrence lands in
//      TypeScript.
export class GetProp<T extends object> {

  static of<U extends object>() {
    return new GetProp<U>();
  }

  get<
    P1 extends keyof T,
  >(p1: P1): (ref: T) => T[P1]
  get<
    P1 extends keyof T,
    P2 extends keyof T[P1],
  >(p1: P1, p2: P2): (ref: T) => T[P1][P2]
  get<
    P1 extends keyof T,
    P2 extends keyof T[P1],
    P3 extends keyof T[P1][P2],
  >(p1: P1, p2: P2, p3: P3): (ref: T) => T[P1][P2][P3]
  get<
    P1 extends keyof T,
    P2 extends keyof T[P1],
    P3 extends keyof T[P1][P2],
    P4 extends keyof T[P1][P2][P3],
  >(p1: P1, p2: P2, p3: P3, p4: P4): (ref: T) => T[P1][P2][P3][P4]
  get<
    P1 extends keyof T,
    P2 extends keyof T[P1],
    P3 extends keyof T[P1][P2],
    P4 extends keyof T[P1][P2][P3],
    P5 extends keyof T[P1][P2][P3][P4],
  >(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (ref: T) => T[P1][P2][P3][P4][P5]
  get<
    P1 extends keyof T,
    P2 extends keyof T[P1],
    P3 extends keyof T[P1][P2],
    P4 extends keyof T[P1][P2][P3],
    P5 extends keyof T[P1][P2][P3][P4],
    P6 extends keyof T[P1][P2][P3][P4][P5],
  >(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): (ref: T) => T[P1][P2][P3][P4][P5][P6]
  get<
    P1 extends keyof T,
    P2 extends keyof T[P1],
    P3 extends keyof T[P1][P2],
    P4 extends keyof T[P1][P2][P3],
    P5 extends keyof T[P1][P2][P3][P4],
    P6 extends keyof T[P1][P2][P3][P4][P5],
    P7 extends keyof T[P1][P2][P3][P4][P5][P6],
  >(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): (ref: T) => T[P1][P2][P3][P4][P5][P6][P7]
  get<
    P1 extends keyof T,
    P2 extends keyof T[P1],
    P3 extends keyof T[P1][P2],
    P4 extends keyof T[P1][P2][P3],
    P5 extends keyof T[P1][P2][P3][P4],
    P6 extends keyof T[P1][P2][P3][P4][P5],
    P7 extends keyof T[P1][P2][P3][P4][P5][P6],
    P8 extends keyof T[P1][P2][P3][P4][P5][P6][P7],
  >(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): (ref: T) => T[P1][P2][P3][P4][P5][P6][P7][P8]
  get(
    ...props: any[]
  ) {
    return function (ref: T) {
      let currentRef: any = ref;
  
      if (currentRef) {
        for (let prop of props) {
          currentRef = currentRef[(prop as keyof typeof currentRef)];
  
          if (!currentRef) {
            break;
          }
        }
      }
  
      return currentRef;
    }
  }
}

export default GetProp.of;
