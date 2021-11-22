export class DataService {
    uzdaviniai = [
        {
            uzdavinys: "2 x 1",
            atsakymas: 2
        },
        {
            uzdavinys: "2 x 2",
            atsakymas: 4
        },
        {
            uzdavinys: "2 x 3",
            atsakymas: 6
        },
        {
            uzdavinys: "2 x 4",
            atsakymas: 8
        },
        {
            uzdavinys: "2 x 5",
            atsakymas: 10
        }
        // {
        //     uzdavinys: "2 x 6",
        //     atsakymas: 12
        // },
        // {
        //     uzdavinys: "2 x 7",
        //     atsakymas: 14
        // },
        // {
        //     uzdavinys: "2 x 8",
        //     atsakymas: 16
        // },
        // {
        //     uzdavinys: "2 x 9",
        //     atsakymas: 18
        // },
        // {
        //     uzdavinys: "3 x 1",
        //     atsakymas: 3
        // },
        // {
        //     uzdavinys: "3 x 2",
        //     atsakymas: 6
        // },
        // {
        //     uzdavinys: "3 x 3",
        //     atsakymas: 9
        // },
        // {
        //     uzdavinys: "3 x 4",
        //     atsakymas: 12
        // },
        // {
        //     uzdavinys: "3 x 5",
        //     atsakymas: 15
        // },
        // {
        //     uzdavinys: "3 x 6",
        //     atsakymas: 18
        // },
        // {
        //     uzdavinys: "3 x 7",
        //     atsakymas: 21
        // },
        // {
        //     uzdavinys: "3 x 8",
        //     atsakymas: 24
        // },
        // {
        //     uzdavinys: "3 x 9",
        //     atsakymas: 27
        // },
        // {
        //     uzdavinys: "4 x 1",
        //     atsakymas: 4
        // },

    ]


    rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
//  Skirtas generuoti daugybos lentelės užduočių masyvui intervale [min..max]
    uzdavinioGeneratoriusDL(min = 2, max = 9){
        const uzdMas = []
        for(let i = min; i <= max; i++){
            for(let j = 2; j <= 9; j++ ){
                uzdMas.push({
                    uzdavinys: i + ' x ' + j,
                    atsakymas: i * j  
                })
            }
        }
        return uzdMas;
    }  
// Skirtas generuoti atsitiktinėms uždavinio reikšmėms intervale [min..max]
    // uzdavinioGeneratorius(min = 2, max = 9){
    //     let kint1 = this.rand(min, max);
    //     let kint2 = this.rand(min, max);
    //     return {
    //         uzdavinys: kint1 + ' x ' +  kint2,
    //         atsakymas: kint1 * kint2  
    //     }
    // }
}

