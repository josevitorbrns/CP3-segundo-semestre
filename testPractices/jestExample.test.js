describe('my component', () => {
    afterAll(() => {
        console.debug('after ALL EXTERNO')
    })
    afterEach(() => {
        console.debug('after EACH EXTERNO')
    })
    it('should kill itself when destroyed', () => {
        console.debug('TESTE EXTERNO')
    })
    describe('when created', () => {
        afterAll(() => {
            console.debug('after ALL INTERNO')
        })
        afterEach(() => {
            console.debug('after EACH INTERNO')
        })
        it('should do this', () => {
            console.debug('TESTE INTERNO 1')
        });

        it(' but not that', () => {
            console.debug('TESTE INTERNO 2')
        });
    })
})