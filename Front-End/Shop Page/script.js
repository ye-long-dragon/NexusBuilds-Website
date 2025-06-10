document.addEventListener('DOMContentLoaded',()=>{
    const allComponents= document.getElementById('allComponents');
    const processor= document.getElementById('Processor');
    const GraphicsCard= document.getElementById('GraphicsCard');
    const Motherboard= document.getElementById('Motherboard');
    const storage= document.getElementById('storage');
    const RAM= document.getElementById('RAM');
    const Case= document.getElementById('Case');
    const PowerSupply= document.getElementById('PowerSupply');
    const Cooling= document.getElementById('Cooling');

    class Filters {
        constructor(size) {
            this.pressCount = new Array(size).fill(0);
        }

        addAllComponents() {
            return ++this.pressCount[0];
        }

        addProcessor() {
            return ++this.pressCount[1];
        }

        addGraphicsCard() {
            return ++this.pressCount[2];
        }

        addMotherboard() {
            return ++this.pressCount[3];
        }

        addStorage() {
            return ++this.pressCount[4];
        }

        addRAM() {
            return ++this.pressCount[5];
        }

        addCase() {
            return ++this.pressCount[6];
        }

        addPowerSupply() {
            return ++this.pressCount[7];
        }

        addCooling() {
            return ++this.pressCount[8];
        }
    }
    
    function checkPressed(num, element){
        if(num%2===0){
            element.style.backgroundColor = '#171D2B';
            element.setAttribute('aria-pressed', 'true');
        }
        else{
        element.style.backgroundColor ='#883AE2';
        element.setAttribute('aria-pressed', 'false');
        }
    }

   //-----MAIN CODE-----

    const btnPressed = new Filters(9);
    checkPressed(btnPressed.addAllComponents,allComponents);
    
    //just add in code for future use
    allComponents.addEventListener('click',()=>{
        checkPressed(btnPressed.addAllComponents(),allComponents);
    });

    processor.addEventListener('click',()=>{
        checkPressed(btnPressed.addAllComponents(),processor);
    });

    GraphicsCard.addEventListener('click',()=>{
        checkPressed(btnPressed.addAllComponents(),GraphicsCard);
    });

    Motherboard.addEventListener('click',()=>{
        checkPressed(btnPressed.addAllComponents(),Motherboard);
    });

    storage.addEventListener('click',()=>{
        checkPressed(btnPressed.addAllComponents(),storage);
    });

    RAM.addEventListener('click',()=>{
        checkPressed(btnPressed.addAllComponents(),RAM);
    });

    Case.addEventListener('click',()=>{
        checkPressed(btnPressed.addAllComponents(),Case);
    });

    PowerSupply.addEventListener('click',()=>{
        checkPressed(btnPressed.addAllComponents(),PowerSupply);
    });

    Cooling.addEventListener('click',()=>{
        checkPressed(btnPressed.addAllComponents(),Cooling);
    });




    console.log(btnPressed.addCase());
})


