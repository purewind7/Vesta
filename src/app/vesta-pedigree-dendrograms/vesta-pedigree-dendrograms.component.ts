import { Component, OnInit, OnChanges, Input, ElementRef, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as data from '../dummy-data/flare-2.json';

@Component({
  selector: 'app-vesta-pedigree-dendrograms',
  templateUrl: './vesta-pedigree-dendrograms.component.html',
  styleUrls: ['./vesta-pedigree-dendrograms.component.sass']
})
export class VestaPedigreeDendrogramsComponent implements OnInit, OnChanges {
  @Input() data: any;
  svg;
  height = 4000;
  width = 1000;
  dx;
  dy;
  g;
  treemap;
  colorScale;
  hostElement;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit() {
    this.updateDendrogram(data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.updateDendrogram(changes.data.currentValue);
    }
  }

  private createDendrogram(data) {
    this.removeExistingDendrogramFromParent();
    this.setChartDimensions();
    const root = this.constructTree(data);

    this.svg.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
  .selectAll('path')
    .data(root.links())
    .join('path')
      .attr('d', d => `
        M${d.target.y},${d.target.x}
        C${d.source.y + this.dy / 2},${d.target.x}
         ${d.source.y + this.dy / 2},${d.source.x}
         ${d.source.y},${d.source.x}
      `);

    this.svg.append('g')
    .selectAll('circle')
    .data(root.descendants())
    .join('circle')
      .attr('cx', d => d.y)
      .attr('cy', d => d.x)
      .attr('fill', d => d.children ? '#555' : '#999')
      .attr('r', 2.5);

    this.svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
    .selectAll('text')
    .data(root.descendants())
    .join('text')
      .attr('x', d => d.y)
      .attr('y', d => d.x)
      .attr('dy', '0.31em')
      .attr('dx', d => d.children ? -6 : 6)
      .text(d => d.data.name)
    .filter(d => d.children)
      .attr('text-anchor', 'end')
    .clone(true).lower()
      .attr('stroke', 'white');
  }

  private setChartDimensions() {
    const viewBoxHeight = this.height;
    const viewBoxWidth = this.width;
    this.svg = d3.select(this.hostElement).append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '-30 -1000 ' + viewBoxWidth + ' ' + viewBoxHeight);
  }

  private setColorScale() {
    this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  }

  private addGraphicsElement() {
    this.g = this.svg.append('g')
        .attr('transform', 'translate(0,0)');
  }

  private constructTree(data) {
    const root = d3.hierarchy(data.default);
    this.dx = 10;
    this.dy = this.width / (root.height + 1);
    return d3.cluster().nodeSize([this.dx, this.dy])(root);
  }

  private updateDendrogram(data) {
    if (!this.svg) {
      this.createDendrogram(data);
      return;
    }

    this.updateAreaDendrogram();
  }

  private updateAreaDendrogram() {
    // TODO: Update
  }

  private removeExistingDendrogramFromParent() {
    d3.select(this.hostElement).select('svg').remove();
  }

}
