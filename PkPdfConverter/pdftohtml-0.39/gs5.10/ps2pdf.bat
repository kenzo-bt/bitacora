@echo off
rem Convert PostScript to PDF.

rem	NOTE: for questions about using this file on Windows NT, please
rem	contact Matt Sergeant (sergeant@geocities.com).

set PS2PDFPARAMS=-q -dNOPAUSE -dBATCH -sDEVICE#pdfwrite
set PS2PDFOPT=

if "%OS%"=="Windows_NT" goto nt

rem	Run ps2pdf on any Microsoft OS.  The executable must be named gs.

set PS2PDFGS=gs

:run
if "%1"=="" goto usage
if "%2"=="" goto usage
:opt
if "%3"=="" goto exec
set PS2PDFOPT=%PS2PDFOPT% %1
shift
goto opt

:exec
rem Watcom C deletes = signs, so use # instead.
rem Doing an initial 'save' helps keep fonts from being flushed between pages.
%PS2PDFGS% %PS2PDFPARAMS% %PS2PDFOPT% -sOutputFile#%2 -c save pop -f %1
goto end

:usage
echo "Usage: ps2pdf [options...] input.ps output.pdf"
goto end

rem	Run ps2pdf on Windows NT.  The executable must be named gswin32c.

:nt
set PS2PDFGS=gswin32c
if not CMDEXTVERSION 1 goto run
if "%1"=="" goto ntusage
if "%2"=="" goto nooutfile
if not "%3"=="" goto opt

rem Watcom C deletes = signs, so use # instead.
%PS2PDFGS% %PS2PDFPARAMS% -sOutputFile#%2 -c save pop -f %1
goto end

:ntusage
echo "Usage: ps2pdf input.ps [output.pdf]"
echo "   or: ps2pdf [options...] input.ps output.pdf"
goto end

:nooutfile
set PS2PDF=%1
set PS2PDF=%PS2PDF:.PS=.PDF%
%PS2PDFGS% %PS2PDFPARAMS% -sOutputFile#%PS2PDF% -c save pop -f %1

:end
rem	Clean up.
SET PS2PDFPARAMS=
SET PS2PDFGS=
SET PS2PDFOPT=
