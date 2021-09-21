import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export class ItHelper {
  public fixture: ComponentFixture<unknown>;

  constructor(fixture) {
    if (typeof fixture === 'undefined') {
      throw new Error(`Make sure in all beforeEach fixture = ... come before the itHelper = new ItHelper(fixture); putting tick()
      and fixture.detectChanges(); afterwards can also fix the first test.`);
    }
    this.fixture = fixture;
  }

  public getDebugElementsTexts(elementArray: DebugElement[]): string[] {
    return elementArray.map((debugElement) => debugElement.nativeElement.textContent);
  }

  public getNativeElementsTexts(elementList: HTMLElement[]): string[] {
    return Array.from(elementList).map((nativeElement) => nativeElement.textContent);
  }

  public getNativeElementText(element: HTMLElement): string {
    return element.textContent;
  }

  public getElement(selector: string, isPresent = true): HTMLElement {
    const foundElement = this.fixture.debugElement.query(By.css(selector));
    if (!foundElement) {
      if (isPresent === false) {
        return undefined;
      } else if (isPresent === true) {
        throw new Error(`ItHelper.getElement could not find the ${selector}`);
      }
    }
    return foundElement.nativeElement;
  }

  /**
   * Element can be present but this.fixture.debugElement.query(By.css(selector)) still returns null. This method can help.
   */
  public getNonDetectableElement(selector: string): HTMLElement {
    return this.fixture.debugElement.nativeElement.querySelector(selector);
  }

  public getElements(selector: string): DebugElement[] {
    // This returns all elements found. Undefined will show unless .nativeElement is called
    // for (entity_option of itHelper.getElements(...) { entity_option.nativeElement }
    return this.fixture.debugElement.queryAll(By.css(selector));
  }

  public getNativeElements(selector: string): HTMLElement[] {
    return this.getElements(selector).map((d) => d.nativeElement);
  }

  // Be aware that some text comes back with spaces on either end because of HTML
  // If this is acceptable for the test, use `getTrimmedElementsTexts()` instead
  public getElementsTexts(selector: string): string[] {
    const elm = this.getElements(selector);
    return this.getDebugElementsTexts(elm);
  }

  public getElementsTextsTrimmed(selector: string): string[] {
    return this.getElementsTexts(selector).map((s) => s.trim());
  }

  // Be aware that some text comes back with spaces on either end because of HTML
  // If this is acceptable for the test, use `getElementsTextTrimmed()` instead
  public getElementText(selector: string): string {
    return this.getElement(selector).textContent;
  }

  public getElementTextTrimmed(selector: string): string {
    return this.getElementText(selector).trim();
  }

  public getElementValue(selector: string): string {
    return (<HTMLInputElement>this.getElement(selector)).value;
  }

  public getElementByText(selector: string, text: string, isPresent?: boolean): DebugElement {
    const element = this.getElements(selector).find((debugElement) => debugElement.nativeElement.textContent.includes(text));
    if (typeof element === 'undefined' && isPresent === true) {
      throw new Error(`No element was found by selector [${selector}] containing text [${text}]`);
    }
    return element;
  }

  public getElementsByText(selector: string, text: string, isPresent?: boolean): DebugElement[] {
    const elements = this.getElements(selector).filter((debugElement) => debugElement.nativeElement.textContent.includes(text));
    if ((typeof elements === 'undefined' || elements.length === 0) && isPresent === true) {
      throw new Error(`Not a single element was found by selector [${selector}] containing text [${text}]`);
    }
    return elements;
  }

  public getNativeElementByText(selector: string, text: string, isPresent?: boolean): HTMLElement {
    return this.getElementByText(selector, text, isPresent).nativeElement;
  }

  public dispatchBlurEvent(selector: string): void {
    const element = this.getElement(selector);
    element.dispatchEvent(new Event('blur'));
    this.fixture.detectChanges();
  }

  public clickNativeElement(nativeElement: HTMLElement, shouldCheckCursor = true): Promise<void> {
    if (shouldCheckCursor) {
      expect(window.getComputedStyle(nativeElement).cursor).toEqual('pointer');
    }
    nativeElement.dispatchEvent(new Event('focus'));
    nativeElement.click();
    // Still needed for initialization
    this.fixture.detectChanges();
    return this.fixture.whenStable().then(() => {
      // Needed for async-fetched
      this.fixture.detectChanges();
    });
  }
}
