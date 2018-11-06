import { Component, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit, Input } from '@angular/core';
import { D3Service, ForceDirectedGraph, Node } from '../../d3';

@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @Input('nodes') nodes;
  @Input('links') links;

  graph: ForceDirectedGraph;
  private _options: { width, height } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
    console.log('this.options',this.options);
  }

  constructor(private d3service: D3Service, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    //Receive an initialized simulated graph from our custom d3 service
    this.graph = this.d3service.getForceDirectedGraph(this.nodes, this.links, this.options);
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options ={
      width: window.innerWidth,
      height: window.innerHeight
    };
    console.log('nodes---',this.nodes);
  }
}
