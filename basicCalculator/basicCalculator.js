import { LightningElement } from 'lwc';

export default class BasicCalculator extends LightningElement {
    firstnumber;
    secondnumber;
    operationresult;
    handleonchange(event)
    {
        const elementname= event.target.name;
        const elementvalue= event.target.value;
        if(elementname === 'fnumber')
        {
            this.firstnumber=elementvalue;
        }
        else
        {
            this.secondnumber=elementvalue;
        }
    }
    doaddition()
    {
        this.operationresult= parseInt(this.firstnumber) + parseInt(this.secondnumber);
    }
    dosubtraction()
    {
        this.operationresult= parseInt(this.firstnumber) - parseInt(this.secondnumber);
    }
    domultiplication()
    {
        this.operationresult= parseInt(this.firstnumber) * parseInt(this.secondnumber);
    }
    dodivision()
    {
        if(this.secondnumber > 0)
        {
            this.operationresult= parseInt(this.firstnumber) / parseInt(this.secondnumber);
        }
        else
        {
            alert('please enter the second number above 0 values.')
        }
    }
    clearthevalues()
    {
        this.firstnumber= clearInterval;
        this.secondnumber= clearInterval;
        this.operationresult=clearInterval;
    }

}