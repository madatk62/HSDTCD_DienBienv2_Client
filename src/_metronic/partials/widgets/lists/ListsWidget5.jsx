/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'

const ListsWidget5 = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark'>Lịch công tác</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <Dropdown1 />
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body card-dashboard pt-2'>
        {/*begin::Dates*/}
        <ul class="nav nav-pills d-flex flex-nowrap hover-scroll-x py-2">
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_0">
              <span class="opacity-50 fs-7 fw-bold">Su</span>
              <span class="fs-6 fw-bolder">22</span>
            </a>
          </li>
          {/*end::Date*/}
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary active" data-bs-toggle="tab" href="#kt_schedule_day_1">
              <span class="opacity-50 fs-7 fw-bold">Mo</span>
              <span class="fs-6 fw-bolder">23</span>
            </a>
          </li>
          {/*end::Date*/}
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_2">
              <span class="opacity-50 fs-7 fw-bold">Tu</span>
              <span class="fs-6 fw-bolder">24</span>
            </a>
          </li>
          {/*end::Date*/}
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_3">
              <span class="opacity-50 fs-7 fw-bold">We</span>
              <span class="fs-6 fw-bolder">25</span>
            </a>
          </li>
          {/*end::Date*/}
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_4">
              <span class="opacity-50 fs-7 fw-bold">Th</span>
              <span class="fs-6 fw-bolder">26</span>
            </a>
          </li>
          {/*end::Date*/}
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_5">
              <span class="opacity-50 fs-7 fw-bold">Fr</span>
              <span class="fs-6 fw-bolder">27</span>
            </a>
          </li>
          {/*end::Date*/}
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_6">
              <span class="opacity-50 fs-7 fw-bold">Sa</span>
              <span class="fs-6 fw-bolder">28</span>
            </a>
          </li>
          {/*end::Date*/}
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_7">
              <span class="opacity-50 fs-7 fw-bold">Su</span>
              <span class="fs-6 fw-bolder">29</span>
            </a>
          </li>
          {/*end::Date*/}
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_8">
              <span class="opacity-50 fs-7 fw-bold">Mo</span>
              <span class="fs-6 fw-bolder">30</span>
            </a>
          </li>
          {/*end::Date*/}
          {/*begin::Date*/}
          <li class="nav-item me-1">
            <a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_9">
              <span class="opacity-50 fs-7 fw-bold">Tu</span>
              <span class="fs-6 fw-bolder">31</span>
            </a>
          </li>
          {/*end::Date*/}
        </ul>
        {/*end::Dates*/}
        {/*begin::Tab Content*/}
        <div class="tab-content">
          {/*begin::Day*/}
          <div id="kt_schedule_day_0" class="tab-pane fade show">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Project Review &amp; Testing</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Naomi Hayabusa</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Marketing Campaign Discussion</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Naomi Hayabusa</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">11:00 - 11:45
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Team Backlog Grooming Session</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Bob Harris</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
          {/*begin::Day*/}
          <div id="kt_schedule_day_1" class="tab-pane fade show active">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Weekly Team Stand-Up</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Walter White</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">14:30 - 15:30
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Sales Pitch Proposal</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Caleb Donaldson</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">11:00 - 11:45
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Weekly Team Stand-Up</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">David Stevenson</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
          {/*begin::Day*/}
          <div id="kt_schedule_day_2" class="tab-pane fade show">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">16:30 - 17:30
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Marketing Campaign Discussion</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Michael Walters</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">10:00 - 11:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Development Team Capacity Review</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Walter White</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">14:30 - 15:30
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Weekly Team Stand-Up</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Peter Marcus</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
          {/*begin::Day*/}
          <div id="kt_schedule_day_3" class="tab-pane fade show">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Lunch &amp; Learn Catch Up</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Michael Walters</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">13:00 - 14:00
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Marketing Campaign Discussion</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Bob Harris</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Kendell Trevor</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
          {/*begin::Day*/}
          <div id="kt_schedule_day_4" class="tab-pane fade show">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">10:00 - 11:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Sales Pitch Proposal</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Terry Robins</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">14:30 - 15:30
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Project Review &amp; Testing</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Yannis Gloverson</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">13:00 - 14:00
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Project Review &amp; Testing</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">David Stevenson</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
          {/*begin::Day*/}
          <div id="kt_schedule_day_5" class="tab-pane fade show">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">12:00 - 13:00
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Project Review &amp; Testing</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Bob Harris</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Karina Clarke</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Creative Content Initiative</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">David Stevenson</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
          {/*begin::Day*/}
          <div id="kt_schedule_day_6" class="tab-pane fade show">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Marketing Campaign Discussion</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Mark Randall</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">12:00 - 13:00
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Project Review &amp; Testing</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Sean Bean</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">16:30 - 17:30
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Committee Review Approvals</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Bob Harris</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
          {/*begin::Day*/}
          <div id="kt_schedule_day_7" class="tab-pane fade show">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">10:00 - 11:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Project Review &amp; Testing</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">David Stevenson</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Committee Review Approvals</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Karina Clarke</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">10:00 - 11:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Walter White</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
          {/*begin::Day*/}
          <div id="kt_schedule_day_8" class="tab-pane fade show">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">16:30 - 17:30
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Dashboard UI/UX Design Review</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Sean Bean</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">14:30 - 15:30
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Dashboard UI/UX Design Review</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Kendell Trevor</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">13:00 - 14:00
                  <span class="fs-7 text-gray-400 text-uppercase">pm</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Development Team Capacity Review</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Peter Marcus</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
          {/*begin::Day*/}
          <div id="kt_schedule_day_9" class="tab-pane fade show">
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">11:00 - 11:45
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Team Backlog Grooming Session</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">David Stevenson</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">9:00 - 10:00
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Lunch &amp; Learn Catch Up</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Peter Marcus</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
            {/*begin::Time*/}
            <div class="d-flex flex-stack position-relative mt-8">
              {/*begin::Bar*/}
              <div class="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
              {/*end::Bar*/}
              {/*begin::Info*/}
              <div class="fw-bold ms-5 text-gray-600">
                {/*begin::Time*/}
                <div class="fs-5">11:00 - 11:45
                  <span class="fs-7 text-gray-400 text-uppercase">am</span></div>
                {/*end::Time*/}
                {/*begin::Title*/}
                <a href="#" class="fs-5 fw-bolder text-gray-800 text-hover-primary mb-2">Creative Content Initiative</a>
                {/*end::Title*/}
                {/*begin::User*/}
                <div class="text-gray-400">Lead by
                  <a href="#">Sean Bean</a></div>
                {/*end::User*/}
              </div>
              {/*end::Info*/}
              {/*begin::Action*/}
              <a href="#" class="btn btn-bg-light btn-active-color-primary btn-sm">View</a>
              {/*end::Action*/}
            </div>
            {/*end::Time*/}
          </div>
          {/*end::Day*/}
        </div>
        {/*end::Tab Content*/}
      </div>
      {/* end: Card Body */}
    </div>
  )
}

export { ListsWidget5 }
