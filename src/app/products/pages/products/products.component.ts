import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../model/product";
import {ProductsService} from "../../services/products.service";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as _ from "lodash";
import { saveAs } from "file-saver"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  studentData: Product;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'image','download']

  @ViewChild('studentForm', {static: false})
  studentForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private studentsService: ProductsService) {
    this.studentData = {} as Product;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllStudents() {
    this.studentsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  downloadFile(){
    this.studentsService.downloadFile().subscribe((data:Blob | MediaSource)=>{
      let downloadURL = window.URL.createObjectURL(data)
      saveAs(downloadURL)
    })

  }


}
